import { createFileRoute, Link } from "@tanstack/react-router";
import { SalesChart } from "@/components/sales-chart";
import { PageIntro, Panel } from "@/components/app-shell";
import { cup, cupCompact, formatHour, formatYmd, formatYmdLong, pct, qty, ticketLabel, usdApprox } from "@/lib/format";
import { usePos } from "@/lib/pos";

export const Route = createFileRoute("/_app/")({
  head: () => ({ meta: [{ title: "Resumen · Mostrador" }] }),
  component: Resumen,
});

function Resumen() {
  const pos = usePos();
  const view = pos.view;
  if (!view || !pos.data) return null;
  const delta =
    view.prevNet && view.prevNet !== 0 ? ((view.net - view.prevNet) / Math.abs(view.prevNet)) * 100 : null;
  const maxFamily = view.families[0]?.sales ?? 1;
  const recent = view.ticketList.slice(0, 6);
  const top = [...view.soldByGood.entries()]
    .sort((a, b) => b[1].sales - a[1].sales)
    .slice(0, 6);

  return (
    <div>
      <PageIntro
        title="Cómo va la tienda"
        lede={`${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. Importes de las ventas registradas en AxisPOS, en CUP.`}
      />

      <div className="grid gap-3 lg:grid-cols-5">
        <Panel className="border-l-4 border-l-copper lg:col-span-3">
          <p className="text-xs tracking-wide text-muted uppercase">Ventas del periodo</p>
          <p className="mt-2 font-display text-4xl tabular-nums tracking-tight md:text-5xl">{cup(view.salesTotal)}</p>
          <p className="mt-2 text-sm text-muted">
            Neto {cup(view.net)} tras devoluciones · unos {usdApprox(view.salesTotal, pos.data.meta.usdRate)} a{" "}
            {pos.data.meta.usdRate} CUP
          </p>
          {delta !== null && (
            <p className={`mt-3 inline-flex rounded-full px-2 py-1 text-xs ${delta >= 0 ? "bg-pine-soft text-pine" : "bg-wine-soft text-wine"}`}>
              {pct(delta)} frente al periodo anterior
            </p>
          )}
          <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
            <Fact label="Tickets" value={qty(view.tickets)} />
            <Fact label="Promedio" value={cupCompact(view.avgTicket)} />
            <Fact label="Devoluciones" value={cupCompact(view.refundTotal)} hint={`${qty(view.refundCount)} docs.`} />
          </dl>
        </Panel>

        <Panel className="lg:col-span-2">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-xl">Ritmo del día</h2>
            <p className="text-xs text-muted">Pico a las {formatHour(view.peakHour)}</p>
          </div>
          <div className="mt-4 flex h-44 items-end gap-1">
            {view.hours.map((hour) => {
              const max = Math.max(...view.hours.map((h) => h.sales), 1);
              const height = Math.max(hour.sales > 0 ? 6 : 0, Math.round((hour.sales / max) * 100));
              const peak = hour.hour === view.peakHour;
              return (
                <div key={hour.hour} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                  <div
                    className={`w-full rounded-t ${peak ? "bg-copper" : "bg-ink"}`}
                    style={{ height: `${height}%` }}
                    title={`${formatHour(hour.hour)} · ${cup(hour.sales)}`}
                  />
                  <span className="mt-1 text-xs tabular-nums text-muted">{hour.hour}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-muted">
            {view.partners.map((p) => `${pos.partnerName(p.id)} ${cupCompact(p.sales)}`).join(" · ") || "Sin cobros"}
          </p>
        </Panel>
      </div>

      <Panel className="mt-3">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="font-display text-xl">Ventas por día</h2>
          <p className="text-xs text-muted">{qty(view.units)} unidades</p>
        </div>
        <SalesChart daily={view.daily} />
      </Panel>

      <Panel className="mt-3">
        <h2 className="font-display text-xl">Lo más vendido</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-xl text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="pb-2 font-medium">Artículo</th>
                <th className="pb-2 font-medium">Familia</th>
                <th className="pb-2 text-right font-medium">Cantidad</th>
                <th className="pb-2 text-right font-medium">Importe</th>
              </tr>
            </thead>
            <tbody>
              {top.map(([id, sold]) => {
                const good = pos.goodsById.get(id);
                return (
                  <tr key={id} className="border-t border-line">
                    <td className="py-2">
                      <Link to="/ventas" search={{ good: id }} className="hover:text-copper">
                        {good?.name ?? `Artículo ${id}`}
                      </Link>
                    </td>
                    <td className="py-2 text-muted">{pos.familyName(id)}</td>
                    <td className="py-2 text-right tabular-nums">{qty(sold.qty)}</td>
                    <td className="py-2 text-right tabular-nums">{cup(sold.sales)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {top.length === 0 && <p className="py-6 text-sm text-muted">Sin movimiento en este periodo.</p>}
        </div>
      </Panel>

      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        <Panel>
          <h2 className="font-display text-xl">Familias</h2>
          <ul className="mt-4 space-y-3">
            {view.families.slice(0, 8).map((family) => (
              <li key={family.name}>
                <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate">{family.name}</span>
                  <span className="shrink-0 tabular-nums text-muted">{cupCompact(family.sales)}</span>
                </div>
                <div className="h-2 rounded-full bg-line">
                  <div
                    className="h-2 rounded-full bg-copper"
                    style={{ width: `${Math.max(2, Math.round((family.sales / maxFamily) * 100))}%` }}
                  />
                </div>
              </li>
            ))}
            {view.families.length === 0 && <Empty />}
          </ul>
        </Panel>
        <Panel>
          <h2 className="font-display text-xl">Cajeros</h2>
          <ul className="mt-3 divide-y divide-line">
            {view.users
              .filter((user) => user.tickets > 0)
              .slice(0, 6)
              .map((user) => (
                <li key={user.id} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0 truncate">{pos.userName(user.id)}</span>
                  <span className="shrink-0 text-right tabular-nums">
                    {cupCompact(user.sales)}
                    <span className="ml-2 text-muted">{qty(user.tickets)}</span>
                  </span>
                </li>
              ))}
          </ul>
        </Panel>
        <Panel>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl">Últimos tickets</h2>
            <Link to="/ventas" search={{ good: undefined }} className="text-sm text-copper">
              Ver todos
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-line">
            {recent.map((ticket) => (
              <li key={ticket.acct} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                <span className="min-w-0">
                  <span className="tabular-nums">{ticketLabel(ticket.acct)}</span>
                  <span className="ml-2 text-muted">
                    {formatYmd(ticket.ymd)} · {pos.userName(ticket.userId)}
                  </span>
                </span>
                <span className="shrink-0 tabular-nums">{cup(ticket.total)}</span>
              </li>
            ))}
            {recent.length === 0 && <Empty />}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Fact({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-display text-xl tabular-nums">{value}</dd>
      {hint && <dd className="text-xs text-muted">{hint}</dd>}
    </div>
  );
}

function Empty() {
  return <li className="py-6 text-sm text-muted">Sin movimiento en este periodo.</li>;
}
