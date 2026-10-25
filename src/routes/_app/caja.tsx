import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageIntro, Panel } from "@/components/app-shell";
import { Pager } from "@/components/pager";
import { cup, formatYmdLong, qty, shiftStamp } from "@/lib/format";
import { usePos } from "@/lib/pos";

const PAGE = 20;

function ymdOf(value: string) {
  if (!value || value.length < 10) return 0;
  return Number(value.slice(0, 4) + value.slice(5, 7) + value.slice(8, 10));
}

export const Route = createFileRoute("/_app/caja")({
  head: () => ({ meta: [{ title: "Caja · Mostrador" }] }),
  component: Caja,
});

function Caja() {
  const pos = usePos();
  const view = pos.view;
  const [page, setPage] = useState(1);

  const shifts = useMemo(() => {
    if (!view || !pos.data) return [];
    return pos.data.shifts
      .filter((shift) => {
        const ymd = ymdOf(shift.open);
        return ymd >= view.from && ymd <= view.to;
      })
      .sort((a, b) => (a.open < b.open ? 1 : -1));
  }, [pos.data, view]);

  if (!view) return null;
  const off = shifts.filter((shift) => Math.abs(shift.diff) >= 1).length;
  const pages = Math.max(1, Math.ceil(shifts.length / PAGE));
  const slice = shifts.slice((page - 1) * PAGE, page * PAGE);

  return (
    <div>
      <PageIntro
        title="Caja"
        lede={`${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. Los cobros de esta copia están en efectivo; Transferencia es un socio, no una tarjeta.`}
      />
      <div className="mb-3 grid gap-3 md:grid-cols-4">
        <Panel>
          <p className="text-xs text-muted">Ventas</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{cup(view.salesTotal)}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Devoluciones</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{cup(view.refundTotal)}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Neto</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{cup(view.net)}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Turnos</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{qty(shifts.length)}</p>
          <p className="text-xs text-muted">{qty(off)} con diferencia</p>
        </Panel>
      </div>
      <Panel>
        <h2 className="font-display text-xl">Turnos</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted">
          La diferencia de cierre en AxisPOS sale distinta de cero cuando el efectivo contado no coincide con la venta del turno, o cuando no se retiró al cerrar.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="pb-2 font-medium">Apertura</th>
                <th className="pb-2 font-medium">Cierre</th>
                <th className="pb-2 font-medium">Quién abrió</th>
                <th className="pb-2 text-right font-medium">Venta del turno</th>
                <th className="pb-2 text-right font-medium">Retiro</th>
                <th className="pb-2 text-right font-medium">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((shift) => (
                <tr key={shift.id} className="border-t border-line">
                  <td className="py-2">{shiftStamp(shift.open)}</td>
                  <td className="py-2">{shiftStamp(shift.close)}</td>
                  <td className="py-2">{pos.userName(shift.userId)}</td>
                  <td className="py-2 text-right tabular-nums">{cup(shift.total)}</td>
                  <td className="py-2 text-right tabular-nums">{cup(shift.withdrawal)}</td>
                  <td className={`py-2 text-right tabular-nums ${Math.abs(shift.diff) >= 1 ? "text-wine" : "text-pine"}`}>
                    {cup(shift.diff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {slice.length === 0 && <p className="py-8 text-sm text-muted">No hay turnos en este periodo.</p>}
        </div>
        <Pager page={Math.min(page, pages)} pages={pages} onPage={setPage} />
      </Panel>
    </div>
  );
}
