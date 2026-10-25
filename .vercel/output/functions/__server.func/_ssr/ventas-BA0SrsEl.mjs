import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-xdGVvXgp.mjs";
import { _ as usePos, c as formatHour, h as ticketLabel, i as Panel, l as formatYmd, o as cup, p as qty, r as PageIntro, u as formatYmdLong } from "./pos-Deo1d8sh.mjs";
import { t as Pager } from "./pager-CC38e1lS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ventas-BA0SrsEl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 24;
function Ventas() {
	const pos = usePos();
	const view = pos.view;
	const { good } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [open, setOpen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		q,
		good,
		view?.from,
		view?.to
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") setOpen(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	const filtered = (0, import_react.useMemo)(() => {
		if (!view) return [];
		const query = q.trim().toLowerCase();
		const named = query ? new Set([...pos.goodsById.values()].filter((item) => item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query)).map((item) => item.id)) : null;
		return view.ticketList.filter((ticket) => {
			if (good) {
				if (!pos.linesByAcct.get(ticket.acct)?.some((line) => line[0] === good)) return false;
			}
			if (!query) return true;
			if (ticketLabel(ticket.acct).includes(query) || String(ticket.acct).includes(query)) return true;
			if (pos.userName(ticket.userId).toLowerCase().includes(query)) return true;
			if (pos.partnerName(ticket.partnerId).toLowerCase().includes(query)) return true;
			const lines = pos.linesByAcct.get(ticket.acct);
			return Boolean(named && lines?.some((line) => named.has(line[0])));
		});
	}, [
		view,
		q,
		good,
		pos
	]);
	if (!view) return null;
	const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
	const slice = filtered.slice((page - 1) * PAGE, page * PAGE);
	const goodName = good ? pos.goodsById.get(good)?.name : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Ventas",
			lede: `${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. ${filtered.length.toLocaleString("es-ES")} tickets.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Buscar ticket, cajero o artículo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (event) => setQ(event.target.value),
						placeholder: "Ticket, cajero o artículo",
						className: "h-11 w-full rounded-xl bg-bg px-3 text-sm ring-1 ring-line"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => download(filtered, pos.userName, pos.partnerName),
					className: "h-11 rounded-xl bg-ink px-4 text-sm text-bg",
					children: "Descargar CSV"
				})]
			}),
			goodName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Artículo:"
					}),
					" ",
					goodName,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-copper",
						onClick: () => navigate({ search: { good: void 0 } }),
						children: "Quitar"
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
								children: "Cuando"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Ticket"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Cajero"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Socio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Líneas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Total"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 text-muted",
								children: [
									formatYmd(ticket.ymd),
									" ",
									formatHour(ticket.hour)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "tabular-nums text-copper",
									onClick: () => setOpen(ticket),
									children: ticketLabel(ticket.acct)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: pos.userName(ticket.userId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: pos.partnerName(ticket.partnerId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: ticket.lines
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: cup(ticket.total)
							})
						]
					}, ticket.acct)) })]
				}), slice.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-sm text-muted",
					children: "No hay tickets con ese filtro."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pager, {
				page,
				pages,
				onPage: setPage
			})
		] }),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketDrawer, {
			ticket: open,
			onClose: () => setOpen(null),
			lines: pos.linesByAcct.get(open.acct) ?? [],
			goodName: (id) => pos.goodsById.get(id)?.name ?? `Artículo ${id}`,
			measure: (id) => pos.goodsById.get(id)?.measure ?? "",
			user: pos.userName(open.userId),
			partner: pos.partnerName(open.partnerId)
		})
	] });
}
function TicketDrawer({ ticket, onClose, lines, goodName, measure, user, partner }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex justify-end bg-ink/40",
		onClick: onClose,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "ticket-title",
			className: "flex h-full w-full flex-col bg-surface shadow-xl md:max-w-md",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Ticket"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "ticket-title",
							className: "font-display text-2xl tabular-nums",
							children: ticketLabel(ticket.acct)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								formatYmd(ticket.ymd),
								" ",
								formatHour(ticket.hour),
								" · ",
								user,
								" · ",
								partner
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-xl ring-1 ring-line",
						onClick: onClose,
						"aria-label": "Cerrar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex-1 divide-y divide-line overflow-y-auto px-5",
					children: lines.map((line, index) => {
						const amount = line[3] * line[4] * (1 - line[5] / 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "min-w-0 text-sm",
									children: goodName(line[0])
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "shrink-0 text-sm tabular-nums",
									children: cup(amount)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									qty(line[3]),
									" ",
									measure(line[0]),
									" × ",
									cup(line[4]),
									line[5] > 0 ? ` · −${line[5]}%` : ""
								]
							})]
						}, `${line[0]}-${index}`);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl tabular-nums",
							children: cup(ticket.total)
						})]
					})
				})
			]
		})
	});
}
function download(tickets, userName, partnerName) {
	const csv = [[
		"fecha",
		"hora",
		"ticket",
		"cajero",
		"socio",
		"lineas",
		"cantidad",
		"total"
	], ...tickets.map((ticket) => [
		String(ticket.ymd),
		formatHour(ticket.hour),
		ticketLabel(ticket.acct),
		userName(ticket.userId),
		partnerName(ticket.partnerId),
		String(ticket.lines),
		String(ticket.qty),
		ticket.total.toFixed(2)
	])].map((row) => row.map((cell) => `"${cell.replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
	const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "ventas-mostrador.csv";
	link.click();
	URL.revokeObjectURL(url);
}
//#endregion
export { Ventas as component };
