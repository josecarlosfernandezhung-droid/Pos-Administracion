import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as usePos, d as levelName, i as Panel, o as cup, p as qty, r as PageIntro, u as formatYmdLong } from "./pos-Deo1d8sh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/equipo-BjD0FIai.js
var import_jsx_runtime = require_jsx_runtime();
function Equipo() {
	const pos = usePos();
	const view = pos.view;
	if (!view || !pos.data) return null;
	const sellers = view.users.filter((user) => user.tickets > 0 || user.refunds > 0);
	const max = Math.max(...sellers.map((user) => user.sales), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Equipo",
			lede: `${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. Quién cobró y a nombre de qué socio quedó la venta.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-2 xl:grid-cols-3",
			children: [sellers.map((user) => {
				const person = pos.usersById.get(user.id);
				const width = Math.max(4, Math.round(user.sales / max * 100));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: pos.userName(user.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: person ? levelName(person.level) : ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: person?.group
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-3xl tabular-nums",
						children: cup(user.sales)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							qty(user.tickets),
							" tickets",
							user.refunds > 0 ? ` · devoluciones ${cup(user.refunds)}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-2 rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-copper",
							style: { width: `${width}%` }
						})
					})
				] }, user.id);
			}), sellers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nadie vendió en este periodo."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Socios en las ventas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-3 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Socio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Tipo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Tickets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Importe"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: view.partners.map((partner) => {
					const row = pos.partnersById.get(partner.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: pos.partnerName(partner.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-muted",
								children: row?.kind ?? "Socio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: qty(partner.tickets)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: cup(partner.sales)
							})
						]
					}, partner.id);
				}) })]
			})]
		})
	] });
}
//#endregion
export { Equipo as component };
