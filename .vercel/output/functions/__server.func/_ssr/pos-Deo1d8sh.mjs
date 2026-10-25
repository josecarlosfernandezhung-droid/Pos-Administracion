import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Package, c as Boxes, i as Receipt, n as Users, o as LayoutDashboard, s as Landmark } from "../_libs/lucide-react.mjs";
import { r as previewPathPrefix } from "./router-xdGVvXgp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-Deo1d8sh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Resumen",
		icon: LayoutDashboard
	},
	{
		to: "/ventas",
		label: "Ventas",
		icon: Receipt
	},
	{
		to: "/productos",
		label: "Productos",
		icon: Package
	},
	{
		to: "/existencias",
		label: "Existencias",
		icon: Boxes
	},
	{
		to: "/caja",
		label: "Caja",
		icon: Landmark
	},
	{
		to: "/equipo",
		label: "Equipo",
		icon: Users
	}
];
var RANGES = [
	{
		id: "7",
		label: "7 días"
	},
	{
		id: "30",
		label: "30 días"
	},
	{
		id: "90",
		label: "90 días"
	},
	{
		id: "all",
		label: "Todo"
	}
];
function AppShell({ range, setRange, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink md:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col md:bg-sidebar md:text-sidebar-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 pt-6 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1 px-3",
					"aria-label": "Secciones",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						item,
						pathname
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-5 pb-6 text-xs leading-5 text-sidebar-muted",
					children: [
						"Copia AxisPOS del 2 oct 2026",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Tienda · pesos cubanos"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-sm text-muted md:block",
							children: "Puesto del computador · la misma vista abre en el teléfono"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex w-full rounded-full bg-surface p-1 ring-1 ring-line md:w-auto",
							role: "group",
							"aria-label": "Periodo",
							children: RANGES.map((item) => {
								const on = item.id === range;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => setRange(item.id),
									className: on ? "h-9 flex-1 rounded-full bg-ink px-3 text-sm text-bg md:flex-none" : "h-9 flex-1 rounded-full px-3 text-sm text-muted md:flex-none",
									children: item.label
								}, item.id);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-1 overflow-x-auto px-4 pb-3 md:hidden",
					"aria-label": "Secciones",
					children: NAV.map((item) => item.to === "/ventas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ventas",
						search: { good: void 0 },
						className: isActive(pathname, item.to) ? "shrink-0 rounded-full bg-ink px-3 py-2 text-sm text-bg" : "shrink-0 rounded-full bg-surface px-3 py-2 text-sm text-muted ring-1 ring-line",
						children: item.label
					}, item.to) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: isActive(pathname, item.to) ? "shrink-0 rounded-full bg-ink px-3 py-2 text-sm text-bg" : "shrink-0 rounded-full bg-surface px-3 py-2 text-sm text-muted ring-1 ring-line",
						children: item.label
					}, item.to))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "w-full px-4 py-5 md:px-8 md:py-8",
				children
			})]
		})]
	});
}
function Brand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-xl bg-copper font-display text-lg text-sidebar-fg",
				children: "M"
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-xl leading-none",
				children: "Mostrador"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-sidebar-muted",
				children: "Tienda"
			})] }),
			compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-xl leading-none",
				children: "Mostrador"
			})
		]
	});
}
function isActive(pathname, to) {
	return to === "/" ? pathname === "/" : pathname.startsWith(to);
}
function NavLink({ item, pathname }) {
	const on = isActive(pathname, item.to);
	const Icon = item.icon;
	const className = on ? "flex h-11 items-center gap-3 rounded-xl bg-sidebar-line px-3 text-sm text-sidebar-fg" : "flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-sidebar-muted hover:bg-sidebar-line hover:text-sidebar-fg";
	if (item.to === "/ventas") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/ventas",
		search: { good: void 0 },
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": "true"
		}), item.label]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": "true"
		}), item.label]
	});
}
function PageIntro({ title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-tight md:text-4xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted",
			children: lede
		})]
	});
}
function Panel({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `rounded-2xl bg-surface p-4 ring-1 ring-line md:p-5 ${className}`,
		children
	});
}
function LoadingCopy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Mostrador"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Leyendo ventas, existencias y caja de la copia AxisPOS…"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 rounded-2xl bg-surface ring-1 ring-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 rounded-2xl bg-surface ring-1 ring-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 rounded-2xl bg-surface ring-1 ring-line" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-2xl bg-surface ring-1 ring-line" })
		]
	});
}
var MONTHS = [
	"ene",
	"feb",
	"mar",
	"abr",
	"may",
	"jun",
	"jul",
	"ago",
	"sep",
	"oct",
	"nov",
	"dic"
];
function ymdToUtc(ymd) {
	const s = String(ymd).padStart(8, "0");
	return new Date(Date.UTC(Number(s.slice(0, 4)), Number(s.slice(4, 6)) - 1, Number(s.slice(6, 8))));
}
function utcToYmd(d) {
	return d.getUTCFullYear() * 1e4 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
}
function addDays(ymd, days) {
	const d = ymdToUtc(ymd);
	d.setUTCDate(d.getUTCDate() + days);
	return utcToYmd(d);
}
function isoToYmd(iso) {
	return Number(iso.slice(0, 4) + iso.slice(5, 7) + iso.slice(8, 10));
}
function formatYmd(ymd) {
	const s = String(ymd).padStart(8, "0");
	const month = MONTHS[Number(s.slice(4, 6)) - 1] ?? "";
	return `${Number(s.slice(6, 8))} ${month}`;
}
function formatYmdLong(ymd) {
	const s = String(ymd).padStart(8, "0");
	const month = MONTHS[Number(s.slice(4, 6)) - 1] ?? "";
	return `${Number(s.slice(6, 8))} ${month} ${s.slice(0, 4)}`;
}
function formatHour(hour) {
	return `${String(hour).padStart(2, "0")}:00`;
}
function ticketLabel(acct) {
	return String(Math.trunc(acct)).padStart(10, "0");
}
function cup(n) {
	const digits = Math.abs(n - Math.round(n)) < .005 ? 0 : 2;
	return `${new Intl.NumberFormat("es-ES", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(n)} CUP`;
}
function cupCompact(n) {
	const abs = Math.abs(n);
	const sign = n < 0 ? "−" : "";
	if (abs >= 1e6) {
		const v = abs / 1e6;
		const digits = v >= 10 ? 1 : 2;
		return `${sign}${v.toFixed(digits)} M`;
	}
	if (abs >= 1e4) return `${sign}${Math.round(abs / 1e3)} mil`;
	return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(n);
}
function usdApprox(n, rate) {
	const v = n / rate;
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(v);
}
function qty(n) {
	const digits = Math.abs(n - Math.round(n)) < .001 ? 0 : 2;
	return new Intl.NumberFormat("es-ES", { maximumFractionDigits: digits }).format(n);
}
function pct(n) {
	return `${n > 0 ? "+" : ""}${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(n)}%`;
}
function shiftStamp(value) {
	if (!value) return "—";
	const ymd = Number(value.slice(0, 4) + value.slice(5, 7) + value.slice(8, 10));
	const hm = value.length >= 16 ? value.slice(11, 16) : "";
	return hm ? `${formatYmd(ymd)} ${hm}` : formatYmd(ymd);
}
var PosContext = (0, import_react.createContext)(null);
function saleAmount(s) {
	return s[3] * s[4] * (1 - s[5] / 100);
}
function refundAmount(r) {
	return r[3] * r[4];
}
function levelName(level) {
	if (level >= 3) return "Administrador";
	if (level === 2) return "Contabilidad";
	return "Cajero";
}
function bounds(data, range) {
	const end = isoToYmd(data.meta.to);
	const start = isoToYmd(data.meta.from);
	if (range === "all") return {
		from: start,
		to: end
	};
	return {
		from: Math.max(start, addDays(end, -(range === "7" ? 6 : range === "30" ? 29 : 89))),
		to: end
	};
}
function familyOf(good, groupsById) {
	if (!good || good.groupId === -1) return "Sin grupo";
	const group = groupsById.get(good.groupId);
	if (!group) return "Sin grupo";
	if (group.parentId) return groupsById.get(group.parentId)?.name ?? group.name;
	return group.name;
}
function aggregate(data, range, groupsById, goodsById) {
	const { from, to } = bounds(data, range);
	const span = range === "7" ? 7 : range === "30" ? 30 : range === "90" ? 90 : 0;
	const prevTo = addDays(from, -1);
	const prevFrom = span ? addDays(prevTo, -(span - 1)) : 0;
	let salesTotal = 0;
	let units = 0;
	let refundTotal = 0;
	let refundCount = 0;
	let prevNet = null;
	let prevSales = 0;
	let prevRefunds = 0;
	const dayMap = /* @__PURE__ */ new Map();
	const hourSales = Array.from({ length: 24 }, () => 0);
	const familyMap = /* @__PURE__ */ new Map();
	const soldByGood = /* @__PURE__ */ new Map();
	const partnerMap = /* @__PURE__ */ new Map();
	const userMap = /* @__PURE__ */ new Map();
	const ticketMap = /* @__PURE__ */ new Map();
	const touchDay = (ymd) => {
		let row = dayMap.get(ymd);
		if (!row) {
			row = {
				sales: 0,
				refunds: 0,
				tickets: 0
			};
			dayMap.set(ymd, row);
		}
		return row;
	};
	for (const s of data.sales) {
		const ymd = s[1];
		const amount = saleAmount(s);
		if (span && ymd >= prevFrom && ymd <= prevTo) prevSales += amount;
		if (ymd < from || ymd > to) continue;
		salesTotal += amount;
		units += s[3];
		touchDay(ymd).sales += amount;
		if (s[2] >= 0 && s[2] < 24) hourSales[s[2]] += amount;
		const fam = familyOf(goodsById.get(s[0]), groupsById);
		const famRow = familyMap.get(fam) ?? {
			sales: 0,
			qty: 0
		};
		famRow.sales += amount;
		famRow.qty += s[3];
		familyMap.set(fam, famRow);
		const sold = soldByGood.get(s[0]) ?? {
			qty: 0,
			sales: 0
		};
		sold.qty += s[3];
		sold.sales += amount;
		soldByGood.set(s[0], sold);
		let ticket = ticketMap.get(s[7]);
		if (!ticket) {
			ticket = {
				acct: s[7],
				ymd,
				hour: s[2],
				userId: s[6],
				partnerId: s[8],
				placeId: s[9],
				total: 0,
				qty: 0,
				lines: 0
			};
			ticketMap.set(s[7], ticket);
			touchDay(ymd).tickets += 1;
			const partner = partnerMap.get(s[8]) ?? {
				sales: 0,
				tickets: 0
			};
			partner.tickets += 1;
			partnerMap.set(s[8], partner);
			const user = userMap.get(s[6]) ?? {
				sales: 0,
				tickets: 0,
				qty: 0,
				refunds: 0
			};
			user.tickets += 1;
			userMap.set(s[6], user);
		}
		ticket.total += amount;
		ticket.qty += s[3];
		ticket.lines += 1;
		if (s[2] < ticket.hour) ticket.hour = s[2];
		const partner = partnerMap.get(s[8]);
		if (partner) partner.sales += amount;
		const user = userMap.get(s[6]);
		if (user) {
			user.sales += amount;
			user.qty += s[3];
		}
	}
	const refundAccts = /* @__PURE__ */ new Set();
	for (const r of data.refunds) {
		const ymd = r[1];
		const amount = refundAmount(r);
		if (span && ymd >= prevFrom && ymd <= prevTo) prevRefunds += amount;
		if (ymd < from || ymd > to) continue;
		refundTotal += amount;
		if (!refundAccts.has(r[6])) {
			refundAccts.add(r[6]);
			refundCount += 1;
		}
		touchDay(ymd).refunds += amount;
		const user = userMap.get(r[5]) ?? {
			sales: 0,
			tickets: 0,
			qty: 0,
			refunds: 0
		};
		user.refunds += amount;
		userMap.set(r[5], user);
	}
	if (span && prevSales + prevRefunds > 0) prevNet = prevSales - prevRefunds;
	const daily = [];
	for (let y = from; y <= to; y = addDays(y, 1)) {
		const row = dayMap.get(y);
		daily.push({
			ymd: y,
			sales: row?.sales ?? 0,
			refunds: row?.refunds ?? 0,
			tickets: row?.tickets ?? 0
		});
		if (daily.length > 400) break;
	}
	const hours = hourSales.map((sales, hour) => ({
		hour,
		sales
	})).filter((h) => h.hour >= 7 && h.hour <= 20);
	let peakHour = 10;
	let peak = -1;
	for (const h of hours) if (h.sales > peak) {
		peak = h.sales;
		peakHour = h.hour;
	}
	const tickets = ticketMap.size;
	return {
		from,
		to,
		salesTotal,
		net: salesTotal - refundTotal,
		tickets,
		units,
		avgTicket: tickets ? salesTotal / tickets : 0,
		refundTotal,
		refundCount,
		prevNet,
		daily,
		hours,
		peakHour,
		families: [...familyMap.entries()].map(([name, v]) => ({
			name,
			...v
		})).sort((a, b) => b.sales - a.sales),
		soldByGood,
		partners: [...partnerMap.entries()].map(([id, v]) => ({
			id,
			...v
		})).sort((a, b) => b.sales - a.sales),
		users: [...userMap.entries()].map(([id, row]) => ({
			id,
			...row
		})).sort((a, b) => b.sales - a.sales),
		ticketList: [...ticketMap.values()].sort((a, b) => b.ymd - a.ymd || b.hour - a.hour || b.acct - a.acct)
	};
}
function dataUrl() {
	return `${typeof window === "undefined" ? "" : previewPathPrefix(window.location.hostname, window.location.pathname) ?? ""}/data/pos.json`;
}
function PosProvider({ children }) {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [range, setRange] = (0, import_react.useState)("30");
	const [rangeReady, setRangeReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("mostrador-range");
		if (saved === "7" || saved === "30" || saved === "90" || saved === "all") setRange(saved);
		setRangeReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!rangeReady) return;
		localStorage.setItem("mostrador-range", range);
	}, [range, rangeReady]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetch(dataUrl()).then((res) => {
			if (!res.ok) throw new Error("No se pudo leer la copia de AxisPOS.");
			return res.json();
		}).then((json) => {
			if (!cancelled) setData(json);
		}).catch((err) => {
			if (!cancelled) setError(err instanceof Error ? err.message : "No se pudo leer la copia.");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const indexes = (0, import_react.useMemo)(() => {
		if (!data) return null;
		const goodsById = new Map(data.goods.map((g) => [g.id, g]));
		const usersById = new Map(data.users.map((u) => [u.id, u]));
		const partnersById = new Map(data.partners.map((p) => [p.id, p]));
		const placesById = new Map(data.places.map((p) => [p.id, p]));
		const groupsById = new Map(data.groups.map((g) => [g.id, g]));
		const linesByAcct = /* @__PURE__ */ new Map();
		for (const sale of data.sales) {
			const list = linesByAcct.get(sale[7]);
			if (list) list.push(sale);
			else linesByAcct.set(sale[7], [sale]);
		}
		const stockByGood = /* @__PURE__ */ new Map();
		for (const row of data.stock) stockByGood.set(row[0], (stockByGood.get(row[0]) ?? 0) + row[2]);
		return {
			goodsById,
			usersById,
			partnersById,
			placesById,
			groupsById,
			linesByAcct,
			stockByGood
		};
	}, [data]);
	const view = (0, import_react.useMemo)(() => {
		if (!data || !indexes) return null;
		return aggregate(data, range, indexes.groupsById, indexes.goodsById);
	}, [
		data,
		indexes,
		range
	]);
	const value = (0, import_react.useMemo)(() => {
		const goodsById = indexes?.goodsById ?? /* @__PURE__ */ new Map();
		const usersById = indexes?.usersById ?? /* @__PURE__ */ new Map();
		const partnersById = indexes?.partnersById ?? /* @__PURE__ */ new Map();
		const placesById = indexes?.placesById ?? /* @__PURE__ */ new Map();
		const groupsById = indexes?.groupsById ?? /* @__PURE__ */ new Map();
		return {
			data,
			error,
			range,
			setRange,
			view,
			goodsById,
			usersById,
			partnersById,
			placesById,
			groupsById,
			linesByAcct: indexes?.linesByAcct ?? /* @__PURE__ */ new Map(),
			stockByGood: indexes?.stockByGood ?? /* @__PURE__ */ new Map(),
			stockRows: data?.stock ?? [],
			userName: (id) => usersById.get(id)?.name ?? (id ? `Usuario ${id}` : "—"),
			partnerName: (id) => partnersById.get(id)?.name ?? "Sin socio",
			placeName: (id) => placesById.get(id)?.name ?? "Local",
			familyName: (goodId) => familyOf(goodsById.get(goodId), groupsById)
		};
	}, [
		data,
		error,
		range,
		view,
		indexes
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosContext.Provider, {
		value,
		children
	});
}
function usePos() {
	const ctx = (0, import_react.useContext)(PosContext);
	if (!ctx) throw new Error("usePos debe usarse dentro del panel");
	return ctx;
}
//#endregion
export { usePos as _, PosProvider as a, formatHour as c, levelName as d, pct as f, usdApprox as g, ticketLabel as h, Panel as i, formatYmd as l, shiftStamp as m, LoadingCopy as n, cup as o, qty as p, PageIntro as r, cupCompact as s, AppShell as t, formatYmdLong as u };
