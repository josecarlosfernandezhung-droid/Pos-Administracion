import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageIntro, Panel } from "@/components/app-shell";
import { Pager } from "@/components/pager";
import { cup, formatHour, formatYmd, formatYmdLong, qty, ticketLabel } from "@/lib/format";
import { usePos, type Ticket } from "@/lib/pos";

const PAGE = 24;

export const Route = createFileRoute("/_app/ventas")({
  validateSearch: (search: Record<string, unknown>): { good: number | undefined } => {
    const good = Number(search.good);
    return { good: Number.isFinite(good) && good > 0 ? good : undefined };
  },
  head: () => ({ meta: [{ title: "Ventas · Mostrador" }] }),
  component: Ventas,
});

function Ventas() {
  const pos = usePos();
  const view = pos.view;
  const { good } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<Ticket | null>(null);

  useEffect(() => {
    setPage(1);
  }, [q, good, view?.from, view?.to]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const filtered = useMemo(() => {
    if (!view) return [];
    const query = q.trim().toLowerCase();
    const named = query
      ? new Set(
          [...pos.goodsById.values()]
            .filter((item) => item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query))
            .map((item) => item.id),
        )
      : null;
    return view.ticketList.filter((ticket) => {
      if (good) {
        const lines = pos.linesByAcct.get(ticket.acct);
        if (!lines?.some((line) => line[0] === good)) return false;
      }
      if (!query) return true;
      if (ticketLabel(ticket.acct).includes(query) || String(ticket.acct).includes(query)) return true;
      if (pos.userName(ticket.userId).toLowerCase().includes(query)) return true;
      if (pos.partnerName(ticket.partnerId).toLowerCase().includes(query)) return true;
      const lines = pos.linesByAcct.get(ticket.acct);
      return Boolean(named && lines?.some((line) => named.has(line[0])));
    });
  }, [view, q, good, pos]);

  if (!view) return null;
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const slice = filtered.slice((page - 1) * PAGE, page * PAGE);
  const goodName = good ? pos.goodsById.get(good)?.name : undefined;

  return (
    <div>
      <PageIntro
        title="Ventas"
        lede={`${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. ${filtered.length.toLocaleString("es-ES")} tickets.`}
      />
      <Panel>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Buscar ticket, cajero o artículo</span>
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Ticket, cajero o artículo"
              className="h-11 w-full rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
            />
          </label>
          <button
            type="button"
            onClick={() => download(filtered, pos.userName, pos.partnerName)}
            className="h-11 rounded-xl bg-ink px-4 text-sm text-bg"
          >
            Descargar CSV
          </button>
        </div>
        {goodName && (
          <p className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-muted">Artículo:</span> {goodName}
            <button type="button" className="text-copper" onClick={() => navigate({ search: { good: undefined } })}>
              Quitar
            </button>
          </p>
        )}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="pb-2 font-medium">Cuando</th>
                <th className="pb-2 font-medium">Ticket</th>
                <th className="pb-2 font-medium">Cajero</th>
                <th className="pb-2 font-medium">Socio</th>
                <th className="pb-2 text-right font-medium">Líneas</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((ticket) => (
                <tr key={ticket.acct} className="border-t border-line">
                  <td className="py-2 text-muted">
                    {formatYmd(ticket.ymd)} {formatHour(ticket.hour)}
                  </td>
                  <td className="py-2">
                    <button type="button" className="tabular-nums text-copper" onClick={() => setOpen(ticket)}>
                      {ticketLabel(ticket.acct)}
                    </button>
                  </td>
                  <td className="py-2">{pos.userName(ticket.userId)}</td>
                  <td className="py-2">{pos.partnerName(ticket.partnerId)}</td>
                  <td className="py-2 text-right tabular-nums">{ticket.lines}</td>
                  <td className="py-2 text-right tabular-nums">{cup(ticket.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {slice.length === 0 && <p className="py-8 text-sm text-muted">No hay tickets con ese filtro.</p>}
        </div>
        <Pager page={page} pages={pages} onPage={setPage} />
      </Panel>
      {open && (
        <TicketDrawer
          ticket={open}
          onClose={() => setOpen(null)}
          lines={pos.linesByAcct.get(open.acct) ?? []}
          goodName={(id) => pos.goodsById.get(id)?.name ?? `Artículo ${id}`}
          measure={(id) => pos.goodsById.get(id)?.measure ?? ""}
          user={pos.userName(open.userId)}
          partner={pos.partnerName(open.partnerId)}
        />
      )}
    </div>
  );
}

function TicketDrawer({
  ticket,
  onClose,
  lines,
  goodName,
  measure,
  user,
  partner,
}: {
  ticket: Ticket;
  onClose: () => void;
  lines: [number, number, number, number, number, number, number, number, number, number][];
  goodName: (id: number) => string;
  measure: (id: number) => string;
  user: string;
  partner: string;
}) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40" onClick={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-title"
        className="flex h-full w-full flex-col bg-surface shadow-xl md:max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="text-xs text-muted">Ticket</p>
            <h2 id="ticket-title" className="font-display text-2xl tabular-nums">
              {ticketLabel(ticket.acct)}
            </h2>
            <p className="text-sm text-muted">
              {formatYmd(ticket.ymd)} {formatHour(ticket.hour)} · {user} · {partner}
            </p>
          </div>
          <button type="button" className="grid size-11 place-items-center rounded-xl ring-1 ring-line" onClick={onClose} aria-label="Cerrar">
            <X className="size-4" />
          </button>
        </div>
        <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
          {lines.map((line, index) => {
            const amount = line[3] * line[4] * (1 - line[5] / 100);
            return (
              <li key={`${line[0]}-${index}`} className="py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 text-sm">{goodName(line[0])}</p>
                  <p className="shrink-0 text-sm tabular-nums">{cup(amount)}</p>
                </div>
                <p className="text-xs text-muted">
                  {qty(line[3])} {measure(line[0])} × {cup(line[4])}
                  {line[5] > 0 ? ` · −${line[5]}%` : ""}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-line px-5 py-4">
          <p className="flex items-baseline justify-between">
            <span className="text-sm text-muted">Total</span>
            <span className="font-display text-2xl tabular-nums">{cup(ticket.total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function download(
  tickets: Ticket[],
  userName: (id: number) => string,
  partnerName: (id: number) => string,
) {
  const header = ["fecha", "hora", "ticket", "cajero", "socio", "lineas", "cantidad", "total"];
  const rows = tickets.map((ticket) => [
    String(ticket.ymd),
    formatHour(ticket.hour),
    ticketLabel(ticket.acct),
    userName(ticket.userId),
    partnerName(ticket.partnerId),
    String(ticket.lines),
    String(ticket.qty),
    ticket.total.toFixed(2),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ventas-mostrador.csv";
  link.click();
  URL.revokeObjectURL(url);
}
