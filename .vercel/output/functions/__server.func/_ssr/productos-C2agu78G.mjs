import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as usePos, i as Panel, o as cup, p as qty, r as PageIntro } from "./pos-Deo1d8sh.mjs";
import { t as Pager } from "./pager-CC38e1lS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/productos-C2agu78G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 30;
function Productos() {
	const pos = usePos();
	const view = pos.view;
	const [q, setQ] = (0, import_react.useState)("");
	const [family, setFamily] = (0, import_react.useState)("todas");
	const [activeOnly, setActiveOnly] = (0, import_react.useState)(true);
	const [sort, setSort] = (0, import_react.useState)("vendido");
	const [page, setPage] = (0, import_react.useState)(1);
	const families = (0, import_react.useMemo)(() => {
		const names = /* @__PURE__ */ new Set();
		for (const good of pos.data?.goods ?? []) names.add(pos.familyName(good.id));
		return [...names].sort((a, b) => a.localeCompare(b, "es"));
	}, [pos]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		q,
		family,
		activeOnly,
		sort,
		view?.from
	]);
	const rows = (0, import_react.useMemo)(() => {
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
	}, [
		pos,
		q,
		family,
		activeOnly,
		sort,
		view
	]);
	if (!view || !pos.data) return null;
	const pages = Math.max(1, Math.ceil(rows.length / PAGE));
	const slice = rows.slice((page - 1) * PAGE, page * PAGE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
		title: "Productos",
		lede: `${rows.length.toLocaleString("es-ES")} artículos del catálogo. El vendido corresponde al periodo elegido.`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (event) => setQ(event.target.value),
					placeholder: "Nombre o código",
					"aria-label": "Buscar producto",
					className: "h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: family,
					onChange: (event) => setFamily(event.target.value),
					"aria-label": "Familia",
					className: "h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "todas",
						children: "Todas las familias"
					}), families.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: name,
						children: name
					}, name))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: sort,
					onChange: (event) => setSort(event.target.value),
					"aria-label": "Orden",
					className: "h-11 rounded-xl bg-bg px-3 text-sm ring-1 ring-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "vendido",
							children: "Más vendidos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "nombre",
							children: "Nombre"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "stock",
							children: "Existencia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "precio",
							children: "Precio"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: activeOnly,
						onChange: (event) => setActiveOnly(event.target.checked)
					}), "Solo activos"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-3xl text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Código"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Artículo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Familia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Precio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Vendido"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Existencia"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((good) => {
					const sold = view.soldByGood.get(good.id);
					const stock = pos.stockByGood.get(good.id) ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 tabular-nums text-muted",
								children: good.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ventas",
									search: { good: good.id },
									className: "hover:text-copper",
									children: good.name
								}), !good.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs text-wine",
									children: "inactivo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-muted",
								children: pos.familyName(good.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: good.price > 0 ? cup(good.price) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: sold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [qty(sold.qty), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-muted",
									children: cup(sold.sales)
								})] }) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: qty(stock)
							})
						]
					}, good.id);
				}) })]
			}), slice.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-sm text-muted",
				children: "Ningún artículo coincide."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pager, {
			page,
			pages,
			onPage: setPage
		})
	] })] });
}
//#endregion
export { Productos as component };
