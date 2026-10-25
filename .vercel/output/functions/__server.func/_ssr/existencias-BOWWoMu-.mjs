import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as usePos, i as Panel, o as cup, p as qty, r as PageIntro } from "./pos-Deo1d8sh.mjs";
import { t as Pager } from "./pager-CC38e1lS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/existencias-BOWWoMu-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 30;
function Existencias() {
	const pos = usePos();
	const view = pos.view;
	const [place, setPlace] = (0, import_react.useState)("todas");
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const rows = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return pos.stockRows.filter((row) => place === "todas" ? true : String(row[1]) === place).filter((row) => {
			if (!query) return true;
			const good = pos.goodsById.get(row[0]);
			return good?.name.toLowerCase().includes(query) || good?.code.toLowerCase().includes(query);
		}).sort((a, b) => b[2] - a[2]);
	}, [
		pos,
		place,
		q
	]);
	const places = (0, import_react.useMemo)(() => {
		return [...new Set(pos.stockRows.map((row) => row[1]))].map((id) => pos.placesById.get(id)).filter((item) => item != null);
	}, [pos]);
	const missing = (0, import_react.useMemo)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Existencias",
			lede: "Foto del almacén en la copia. Tornillos y expansores están contados por pieza, como los guardó AxisPOS. Casi ningún artículo tiene costo cargado."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Referencias con stock"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums",
					children: qty(sku)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Piezas en total"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums",
					children: qty(units)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Vendidos y agotados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums",
					children: qty(missing.length)
				})] })
			]
		}),
		missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Se vendieron y ya no quedan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2 md:grid-cols-2",
				children: missing.slice(0, 12).map(([id, sold]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ventas",
						search: { good: id },
						className: "min-w-0 truncate hover:text-copper",
						children: pos.goodsById.get(id)?.name ?? `Artículo ${id}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums text-muted",
						children: cup(sold.sales)
					})]
				}, id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (event) => {
						setQ(event.target.value);
						setPage(1);
					},
					placeholder: "Buscar artículo",
					"aria-label": "Buscar existencia",
					className: "h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line md:col-span-2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: place,
					"aria-label": "Local",
					onChange: (event) => {
						setPlace(event.target.value);
						setPage(1);
					},
					className: "h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "todas",
						children: "Todos los locales"
					}), places.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: item.id,
						children: [item.name, item.active ? "" : " (archivado)"]
					}, item.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-2xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Artículo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Local"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Cantidad"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Precio de lista"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((row) => {
						const good = pos.goodsById.get(row[0]);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: good?.name ?? `Artículo ${row[0]}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-muted",
									children: pos.placeName(row[1])
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 text-right tabular-nums",
									children: [
										qty(row[2]),
										" ",
										good?.measure ?? ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: good && good.price > 0 ? cup(good.price) : "—"
								})
							]
						}, `${row[0]}-${row[1]}`);
					}) })]
				}), slice.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-sm text-muted",
					children: "Nada en este local."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pager, {
				page: Math.min(page, pages),
				pages,
				onPage: setPage
			})
		] })
	] });
}
//#endregion
export { Existencias as component };
