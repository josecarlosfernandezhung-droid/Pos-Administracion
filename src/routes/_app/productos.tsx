import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageIntro, Panel } from "@/components/app-shell";
import { Pager } from "@/components/pager";
import { cup, qty } from "@/lib/format";
import { usePos } from "@/lib/pos";

const PAGE = 30;

export const Route = createFileRoute("/_app/productos")({
  head: () => ({ meta: [{ title: "Productos · Mostrador" }] }),
  component: Productos,
});

function Productos() {
  const pos = usePos();
  const view = pos.view;
  const [q, setQ] = useState("");
  const [family, setFamily] = useState("todas");
  const [activeOnly, setActiveOnly] = useState(true);
  const [sort, setSort] = useState<"vendido" | "nombre" | "stock" | "precio">("vendido");
  const [page, setPage] = useState(1);

  const families = useMemo(() => {
    const names = new Set<string>();
    for (const good of pos.data?.goods ?? []) names.add(pos.familyName(good.id));
    return [...names].sort((a, b) => a.localeCompare(b, "es"));
  }, [pos]);

  useEffect(() => {
    setPage(1);
  }, [q, family, activeOnly, sort, view?.from]);

  const rows = useMemo(() => {
    if (!pos.data || !view) return [];
    const query = q.trim().toLowerCase();
    const list = pos.data.goods.filter((good) => {
      if (activeOnly && !good.active) return false;
      if (family !== "todas" && pos.familyName(good.id) !== family) return false;
      if (!query) return true;
      return good.name.toLowerCase().includes(query) || good.code.toLowerCase().includes(query);
    });
    list.sort((a, b) => {
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      if (sort === "precio") return b.price - a.price;
      if (sort === "stock") return (pos.stockByGood.get(b.id) ?? 0) - (pos.stockByGood.get(a.id) ?? 0);
      return (view.soldByGood.get(b.id)?.sales ?? 0) - (view.soldByGood.get(a.id)?.sales ?? 0);
    });
    return list;
  }, [pos, q, family, activeOnly, sort, view]);

  if (!view || !pos.data) return null;
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const slice = rows.slice((page - 1) * PAGE, page * PAGE);

  return (
    <div>
      <PageIntro
        title="Productos"
        lede={`${rows.length.toLocaleString("es-ES")} artículos del catálogo. El vendido corresponde al periodo elegido.`}
      />
      <Panel>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:items-center">
          <input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Nombre o código"
            aria-label="Buscar producto"
            className="h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
          />
          <select
            value={family}
            onChange={(event) => setFamily(event.target.value)}
            aria-label="Familia"
            className="h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
          >
            <option value="todas">Todas las familias</option>
            {families.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
            aria-label="Orden"
            className="h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
          >
            <option value="vendido">Más vendidos</option>
            <option value="nombre">Nombre</option>
            <option value="stock">Existencia</option>
            <option value="precio">Precio</option>
          </select>
          <label className="flex h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={activeOnly} onChange={(event) => setActiveOnly(event.target.checked)} />
            Solo activos
          </label>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="text-muted">
                <th className="pb-2 font-medium">Código</th>
                <th className="pb-2 font-medium">Artículo</th>
                <th className="pb-2 font-medium">Familia</th>
                <th className="pb-2 text-right font-medium">Precio</th>
                <th className="pb-2 text-right font-medium">Vendido</th>
                <th className="pb-2 text-right font-medium">Existencia</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((good) => {
                const sold = view.soldByGood.get(good.id);
                const stock = pos.stockByGood.get(good.id) ?? 0;
                return (
                  <tr key={good.id} className="border-t border-line">
                    <td className="py-2 tabular-nums text-muted">{good.code}</td>
                    <td className="py-2">
                      <Link to="/ventas" search={{ good: good.id }} className="hover:text-copper">
                        {good.name}
                      </Link>
                      {!good.active && <span className="ml-2 text-xs text-wine">inactivo</span>}
                    </td>
                    <td className="py-2 text-muted">{pos.familyName(good.id)}</td>
                    <td className="py-2 text-right tabular-nums">{good.price > 0 ? cup(good.price) : "—"}</td>
                    <td className="py-2 text-right tabular-nums">
                      {sold ? (
                        <>
                          {qty(sold.qty)}
                          <span className="ml-2 text-muted">{cup(sold.sales)}</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2 text-right tabular-nums">{qty(stock)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {slice.length === 0 && <p className="py-8 text-sm text-muted">Ningún artículo coincide.</p>}
        </div>
        <Pager page={page} pages={pages} onPage={setPage} />
      </Panel>
    </div>
  );
}
