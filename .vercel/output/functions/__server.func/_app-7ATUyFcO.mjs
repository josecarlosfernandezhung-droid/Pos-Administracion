import { S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as usePos, c as formatHour, f as pct, g as usdApprox, h as ticketLabel, i as Panel, l as formatYmd, o as cup, p as qty, r as PageIntro, s as cupCompact, u as formatYmdLong } from "./_ssr/pos-Deo1d8sh.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-7ATUyFcO.js
var import_jsx_runtime = require_jsx_runtime();
function SalesChart({ daily }) {
	const points = bucket(daily).map((p) => ({
		...p,
		label: formatYmd(p.ymd)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: points,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						interval: points.length > 12 ? Math.ceil(points.length / 6) : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tickFormatter: (v) => cupCompact(v),
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						tickLine: false,
						axisLine: false,
						width: 56
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesTip, {}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "sales",
						name: "Ventas",
						stroke: "var(--color-copper)",
						fill: "var(--color-copper)",
						fillOpacity: .16,
						strokeWidth: 2,
						dot: false,
						activeDot: {
							r: 4,
							fill: "var(--color-copper)"
						}
					})
				]
			})
		})
	});
}
function bucket(daily) {
	if (daily.length <= 45) return daily;
	const out = [];
	for (let i = 0; i < daily.length; i += 7) {
		const slice = daily.slice(i, i + 7);
		out.push({
			ymd: slice[0]?.ymd ?? 0,
			sales: slice.reduce((sum, day) => sum + day.sales, 0)
		});
	}
	return out;
}
function SalesTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-ink px-3 py-2 text-xs text-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sidebar-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium tabular-nums",
			children: cup(payload[0]?.value ?? 0)
		})]
	});
}
function Resumen() {
	const pos = usePos();
	const view = pos.view;
	if (!view || !pos.data) return null;
	const delta = view.prevNet && view.prevNet !== 0 ? (view.net - view.prevNet) / Math.abs(view.prevNet) * 100 : null;
	const maxFamily = view.families[0]?.sales ?? 1;
	const recent = view.ticketList.slice(0, 6);
	const top = [...view.soldByGood.entries()].sort((a, b) => b[1].sales - a[1].sales).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Cómo va la tienda",
			lede: `${formatYmdLong(view.from)} – ${formatYmdLong(view.to)}. Importes de las ventas registradas en AxisPOS, en CUP.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-l-4 border-l-copper lg:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-muted uppercase",
						children: "Ventas del periodo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-4xl tabular-nums tracking-tight md:text-5xl",
						children: cup(view.salesTotal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Neto ",
							cup(view.net),
							" tras devoluciones · unos ",
							usdApprox(view.salesTotal, pos.data.meta.usdRate),
							" a",
							" ",
							pos.data.meta.usdRate,
							" CUP"
						]
					}),
					delta !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `mt-3 inline-flex rounded-full px-2 py-1 text-xs ${delta >= 0 ? "bg-pine-soft text-pine" : "bg-wine-soft text-wine"}`,
						children: [pct(delta), " frente al periodo anterior"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Tickets",
								value: qty(view.tickets)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Promedio",
								value: cupCompact(view.avgTicket)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Devoluciones",
								value: cupCompact(view.refundTotal),
								hint: `${qty(view.refundCount)} docs.`
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Ritmo del día"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["Pico a las ", formatHour(view.peakHour)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex h-44 items-end gap-1",
						children: view.hours.map((hour) => {
							const max = Math.max(...view.hours.map((h) => h.sales), 1);
							const height = Math.max(hour.sales > 0 ? 6 : 0, Math.round(hour.sales / max * 100));
							const peak = hour.hour === view.peakHour;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full min-w-0 flex-1 flex-col items-center justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-full rounded-t ${peak ? "bg-copper" : "bg-ink"}`,
									style: { height: `${height}%` },
									title: `${formatHour(hour.hour)} · ${cup(hour.sales)}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 text-xs tabular-nums text-muted",
									children: hour.hour
								})]
							}, hour.hour);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: view.partners.map((p) => `${pos.partnerName(p.id)} ${cupCompact(p.sales)}`).join(" · ") || "Sin cobros"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Ventas por día"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [qty(view.units), " unidades"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesChart, { daily: view.daily })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Lo más vendido"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-muted",
						children: [
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
								children: "Cantidad"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Importe"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: top.map(([id, sold]) => {
						const good = pos.goodsById.get(id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/ventas",
										search: { good: id },
										className: "hover:text-copper",
										children: good?.name ?? `Artículo ${id}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-muted",
									children: pos.familyName(id)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: qty(sold.qty)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right tabular-nums",
									children: cup(sold.sales)
								})
							]
						}, id);
					}) })]
				}), top.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-sm text-muted",
					children: "Sin movimiento en este periodo."
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 xl:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Familias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3",
					children: [view.families.slice(0, 8).map((family) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: family.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 tabular-nums text-muted",
							children: cupCompact(family.sales)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-copper",
							style: { width: `${Math.max(2, Math.round(family.sales / maxFamily * 100))}%` }
						})
					})] }, family.name)), view.families.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Cajeros"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line",
					children: view.users.filter((user) => user.tickets > 0).slice(0, 6).map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate",
							children: pos.userName(user.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 text-right tabular-nums",
							children: [cupCompact(user.sales), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-muted",
								children: qty(user.tickets)
							})]
						})]
					}, user.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Últimos tickets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ventas",
						search: { good: void 0 },
						className: "text-sm text-copper",
						children: "Ver todos"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 divide-y divide-line",
					children: [recent.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: ticketLabel(ticket.acct)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-muted",
								children: [
									formatYmd(ticket.ymd),
									" · ",
									pos.userName(ticket.userId)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 tabular-nums",
							children: cup(ticket.total)
						})]
					}, ticket.acct)), recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})]
				})] })
			]
		})
	] });
}
function Fact({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-xl tabular-nums",
			children: value
		}),
		hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-xs text-muted",
			children: hint
		})
	] });
}
function Empty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "py-6 text-sm text-muted",
		children: "Sin movimiento en este periodo."
	});
}
//#endregion
export { Resumen as component };
