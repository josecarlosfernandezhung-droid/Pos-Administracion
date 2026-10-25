import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Panel } from "@/components/app-shell";
import { cup, formatYmdLong, qty } from "@/lib/format";
import { levelName, usePos } from "@/lib/pos";

export const Route = createFileRoute("/_app/equipo")({
  head: () => ({ meta: [{ title: "Equipo · Mostrador" }] }),
  component: Equipo,
});

function Equipo() {
  const pos = usePos();
  const view = pos.view;
  if (!view || !pos.data) return null;
  const sellers = view.users.filter((user) => user.tickets > 0 || user.refunds > 0);
  const max = Math.max(...sellers.map((user) => user.sales), 1);

  return (
    <div>
      <PageIntro
        title="Equipo"
        lede={`${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. Quién cobró y a nombre de qué socio quedó la venta.`}
      />
      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {sellers.map((user) => {
          const person = pos.usersById.get(user.id);
          const width = Math.max(4, Math.round((user.sales / max) * 100));
          return (
            <Panel key={user.id}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl">{pos.userName(user.id)}</h2>
                <p className="text-xs text-muted">{person ? levelName(person.level) : ""}</p>
              </div>
              <p className="text-sm text-muted">{person?.group}</p>
              <p className="mt-4 font-display text-3xl tabular-nums">{cup(user.sales)}</p>
              <p className="mt-1 text-sm text-muted">
                {qty(user.tickets)} tickets
                {user.refunds > 0 ? ` · devoluciones ${cup(user.refunds)}` : ""}
              </p>
              <div className="mt-4 h-2 rounded-full bg-line">
                <div className="h-2 rounded-full bg-copper" style={{ width: `${width}%` }} />
              </div>
            </Panel>
          );
        })}
        {sellers.length === 0 && <p className="text-sm text-muted">Nadie vendió en este periodo.</p>}
      </div>

      <Panel className="mt-3">
        <h2 className="font-display text-xl">Socios en las ventas</h2>
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="text-muted">
              <th className="pb-2 font-medium">Socio</th>
              <th className="pb-2 font-medium">Tipo</th>
              <th className="pb-2 text-right font-medium">Tickets</th>
              <th className="pb-2 text-right font-medium">Importe</th>
            </tr>
          </thead>
          <tbody>
            {view.partners.map((partner) => {
              const row = pos.partnersById.get(partner.id);
              return (
                <tr key={partner.id} className="border-t border-line">
                  <td className="py-2">{pos.partnerName(partner.id)}</td>
                  <td className="py-2 text-muted">{row?.kind ?? "Socio"}</td>
                  <td className="py-2 text-right tabular-nums">{qty(partner.tickets)}</td>
                  <td className="py-2 text-right tabular-nums">{cup(partner.sales)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
