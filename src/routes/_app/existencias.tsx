import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageIntro, Panel } from "@/components/app-shell";
import { Pager } from "@/components/pager";
import { cup, qty } from "@/lib/format";
import { usePos } from "@/lib/pos";

const PAGE = 30;

export const Route = createFileRoute("/_app/existencias")({
  head: () => ({ meta: [{ title: "Existencias · Mostrador" }] }),
  component: Existencias,
});

function Existencias() {
  const pos = usePos();
  const view = pos.view;
  const [place, setPlace] = useState("todas");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return pos.stockRows
      .filter((row) => (place === "todas" ? true : String(row[1]) === place))
      .filter((row) => {
        if (!query) return true;
        const good = pos.goodsById.get(row[0]);
        return good?.name.toLowerCase().includes(query) || good?.code.toLowerCase().includes(query);
      })
      .sort((a, b) => b[2] - a[2]);
  }, [pos, place, q]);

  const places = useMemo(() => {
    const ids = new Set(pos.stockRows.map((row) => row[1]));
    return [...ids].map((id) => pos.placesById.get(id)).filter((item) => item != null);
  }, [pos]);

  const missing = useMemo(() => {
    if (!view) return [];
    const list = [...view.soldByGood.entries()].filter(([id, sold]) => sold.qty > 0 && (pos.stockByGood.get(id) ?? 0) <= 0);
    list.sort((a, b) => b[1].sales - a[1].sales);
    return list;
  }, [view, pos]);

  if (!view) return null;
  const sku = new Set(pos.stockRows.map((row) => row[0])).size;
  const units = pos.stockRows.reduce((sum, row) => sum + row[2], 0);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const slice = rows.slice((page - 1) * PAGE, page * PAGE);

  return (
    <div>
      <PageIntro
        title="Existencias"
        lede="Foto del almacén en la copia. Tornillos y expansores están contados por pieza, como los guardó AxisPOS. Casi ningún artículo tiene costo cargado."
      />
      <div className="mb-3 grid gap-3 md:grid-cols-3">
        <Panel>
          <p className="text-xs text-muted">Referencias con stock</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{qty(sku)}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Piezas en total</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{qty(units)}</p>
        </Panel>
        <Panel>
          <p className="text-xs text-muted">Vendidos y agotados</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{qty(missing.length)}</p>
        </Panel>
      </div>

      {missing.length > 0 && (
        <Panel className="mb-3">
          <h2 className="font-display text-xl">Se vendieron y ya no quedan</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {missing.slice(0, 12).map(([id, sold]) => (
              <li key={id} className="flex items-baseline justify-between gap-3 text-sm">
                <Link to="/ventas" search={{ good: id }} className="min-w-0 truncate hover:text-copper">
                  {pos.goodsById.get(id)?.name ?? `Artículo ${id}`}
                </Link>
                <span className="shrink-0 tabular-nums text-muted">{cup(sold.sales)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel>
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={q}
            onChange={(event) => {
              setQ(event.target.value);
              setPage(1);
            }}
            placeholder="Buscar artículo"
            aria-label="Buscar existencia"
            className="h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line md:col-span-2"
          />
          <select
            value={place}
            aria-label="Local"
            onChange={(event) => {
              setPlace(event.target.value);
              setPage(1);
            }}
            className="h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
          >
            <option value="todas">Todos los locales</option>
            {places.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                {item.active ? "" : " (archivado)"}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-2xl text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="pb-2 font-medium">Artículo</th>
                <th className="pb-2 font-medium">Local</th>
                <th className="pb-2 text-right font-medium">Cantidad</th>
                <th className="pb-2 text-right font-medium">Precio de lista</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((row) => {
                const good = pos.goodsById.get(row[0]);
                return (
                  <tr key={`${row[0]}-${row[1]}`} className="border-t border-line">
                    <td className="py-2">{good?.name ?? `Artículo ${row[0]}`}</td>
                    <td className="py-2 text-muted">{pos.placeName(row[1])}</td>
                    <td className="py-2 text-right tabular-nums">
                      {qty(row[2])} {good?.measure ?? ""}
                    </td>
                    <td className="py-2 text-right tabular-nums">{good && good.price > 0 ? cup(good.price) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {slice.length === 0 && <p className="py-8 text-sm text-muted">Nada en este local.</p>}
        </div>
        <Pager page={Math.min(page, pages)} pages={pages} onPage={setPage} />
      </Panel>
    </div>
  );
}
