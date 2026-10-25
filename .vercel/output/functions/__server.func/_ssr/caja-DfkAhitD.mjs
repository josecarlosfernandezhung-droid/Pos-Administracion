import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as usePos, i as Panel, m as shiftStamp, o as cup, p as qty, r as PageIntro, u as formatYmdLong } from "./pos-Deo1d8sh.mjs";
import { t as Pager } from "./pager-CC38e1lS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/caja-DfkAhitD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 20;
function ymdOf(value) {
	if (!value || value.length < 10) return 0;
	return Number(value.slice(0, 4) + value.slice(5, 7) + value.slice(8, 10));
}
function Caja() {
	const pos = usePos();
	const view = pos.view;
	const [page, setPage] = (0, import_react.useState)(1);
	const shifts = (0, import_react.useMemo)(() => {
		if (!view || !pos.data) return [];
		return pos.data.shifts.filter((shift) => {
			const ymd = ymdOf(shift.open);
			return ymd >= view.from && ymd <= view.to;
		}).sort((a, b) => a.open < b.open ? 1 : -1);
	}, [pos.data, view]);
	if (!view) return null;
	const off = shifts.filter((shift) => Math.abs(shift.diff) >= 1).length;
	const pages = Math.max(1, Math.ceil(shifts.length / PAGE));
	const slice = shifts.slice((page - 1) * PAGE, page * PAGE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Caja",
			lede: `${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. Los cobros de esta copia están en efectivo; Transferencia es un socio, no una tarjeta.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 grid gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Ventas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl tabular-nums",
					children: cup(view.salesTotal)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Devoluciones"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl tabular-nums",
					children: cup(view.refundTotal)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Neto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl tabular-nums",
					children: cup(view.net)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Turnos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl tabular-nums",
						children: qty(shifts.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [qty(off), " con diferencia"]
					})
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Turnos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-3xl text-sm text-muted",
				children: "La diferencia de cierre en AxisPOS sale distinta de cero cuando el efectivo contado no coincide con la venta del turno, o cuando no se retiró al cerrar."
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
								children: "Apertura"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Cierre"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Quién abrió"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Venta del turno"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Retiro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Diferencia"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((shift) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: shiftStamp(shift.open)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: shiftStamp(shift.close)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: pos.userName(shift.userId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: cup(shift.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: cup(shift.withdrawal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: `py-2 text-right tabular-nums ${Math.abs(shift.diff) >= 1 ? "text-wine" : "text-pine"}`,
								children: cup(shift.diff)
							})
						]
					}, shift.id)) })]
				}), slice.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-sm text-muted",
					children: "No hay turnos en este periodo."
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
export { Caja as component };
