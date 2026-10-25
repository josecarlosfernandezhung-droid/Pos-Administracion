import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { addDays, isoToYmd } from "@/lib/format";
import { previewPathPrefix } from "@/lib/preview-path-prefix";

export type RangeKey = "7" | "30" | "90" | "all";

export type UserRow = { id: number; name: string; group: string; level: number };
export type GroupRow = { id: number; name: string; parentId: number | null };
export type PartnerRow = { id: number; name: string; kind: string; active: boolean };
export type PlaceRow = { id: number; name: string; active: boolean };
export type GoodRow = {
  id: number;
  code: string;
  name: string;
  groupId: number;
  cost: number;
  price: number;
  measure: string;
  active: boolean;
};

/** good, ymd, hour, qty, price, disc%, user, acct, partner, place */
export type Sale = [number, number, number, number, number, number, number, number, number, number];
/** good, ymd, hour, qty, price, user, acct, partner */
export type Refund = [number, number, number, number, number, number, number, number];
/** good, place, qty, unitCost */
export type StockRow = [number, number, number, number];

export type PosData = {
  meta: {
    company: string;
    asOf: string;
    from: string;
    to: string;
    currency: string;
    usdRate: number;
  };
  users: UserRow[];
  groups: GroupRow[];
  partners: PartnerRow[];
  places: PlaceRow[];
  goods: GoodRow[];
  stock: StockRow[];
  sales: Sale[];
  refunds: Refund[];
  shifts: {
    id: number;
    placeId: number;
    open: string;
    close: string | null;
    userId: number;
    opening: number;
    total: number;
    withdrawal: number;
    diff: number;
    status: number;
  }[];
};

export type Ticket = {
  acct: number;
  ymd: number;
  hour: number;
  userId: number;
  partnerId: number;
  placeId: number;
  total: number;
  qty: number;
  lines: number;
};

export type View = {
  from: number;
  to: number;
  salesTotal: number;
  net: number;
  tickets: number;
  units: number;
  avgTicket: number;
  refundTotal: number;
  refundCount: number;
  prevNet: number | null;
  daily: { ymd: number; sales: number; refunds: number; tickets: number }[];
  hours: { hour: number; sales: number }[];
  peakHour: number;
  families: { name: string; sales: number; qty: number }[];
  soldByGood: Map<number, { qty: number; sales: number }>;
  partners: { id: number; sales: number; tickets: number }[];
  users: { id: number; sales: number; tickets: number; qty: number; refunds: number }[];
  ticketList: Ticket[];
};

const PosContext = createContext<PosState | null>(null);

type PosState = {
  data: PosData | null;
  error: string | null;
  range: RangeKey;
  setRange: (range: RangeKey) => void;
  view: View | null;
  goodsById: Map<number, GoodRow>;
  usersById: Map<number, UserRow>;
  partnersById: Map<number, PartnerRow>;
  placesById: Map<number, PlaceRow>;
  groupsById: Map<number, GroupRow>;
  linesByAcct: Map<number, Sale[]>;
  stockByGood: Map<number, number>;
  stockRows: StockRow[];
  userName: (id: number) => string;
  partnerName: (id: number) => string;
  placeName: (id: number) => string;
  familyName: (goodId: number) => string;
};

function saleAmount(s: Sale) {
  return s[3] * s[4] * (1 - s[5] / 100);
}

function refundAmount(r: Refund) {
  return r[3] * r[4];
}

export function levelName(level: number) {
  if (level >= 3) return "Administrador";
  if (level === 2) return "Contabilidad";
  return "Cajero";
}

function bounds(data: PosData, range: RangeKey) {
  const end = isoToYmd(data.meta.to);
  const start = isoToYmd(data.meta.from);
  if (range === "all") return { from: start, to: end };
  const back = range === "7" ? 6 : range === "30" ? 29 : 89;
  return { from: Math.max(start, addDays(end, -back)), to: end };
}

function familyOf(good: GoodRow | undefined, groupsById: Map<number, GroupRow>) {
  if (!good || good.groupId === -1) return "Sin grupo";
  const group = groupsById.get(good.groupId);
  if (!group) return "Sin grupo";
  if (group.parentId) return groupsById.get(group.parentId)?.name ?? group.name;
  return group.name;
}

function aggregate(data: PosData, range: RangeKey, groupsById: Map<number, GroupRow>, goodsById: Map<number, GoodRow>): View {
  const { from, to } = bounds(data, range);
  const span = range === "7" ? 7 : range === "30" ? 30 : range === "90" ? 90 : 0;
  const prevTo = addDays(from, -1);
  const prevFrom = span ? addDays(prevTo, -(span - 1)) : 0;

  let salesTotal = 0;
  let units = 0;
  let refundTotal = 0;
  let refundCount = 0;
  let prevNet: number | null = null;
  let prevSales = 0;
  let prevRefunds = 0;

  const dayMap = new Map<number, { sales: number; refunds: number; tickets: number }>();
  const hourSales = Array.from({ length: 24 }, () => 0);
  const familyMap = new Map<string, { sales: number; qty: number }>();
  const soldByGood = new Map<number, { qty: number; sales: number }>();
  const partnerMap = new Map<number, { sales: number; tickets: number }>();
  const userMap = new Map<number, { sales: number; tickets: number; qty: number; refunds: number }>();
  const ticketMap = new Map<number, Ticket>();

  const touchDay = (ymd: number) => {
    let row = dayMap.get(ymd);
    if (!row) {
      row = { sales: 0, refunds: 0, tickets: 0 };
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
    const famRow = familyMap.get(fam) ?? { sales: 0, qty: 0 };
    famRow.sales += amount;
    famRow.qty += s[3];
    familyMap.set(fam, famRow);

    const sold = soldByGood.get(s[0]) ?? { qty: 0, sales: 0 };
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
        lines: 0,
      };
      ticketMap.set(s[7], ticket);
      touchDay(ymd).tickets += 1;
      const partner = partnerMap.get(s[8]) ?? { sales: 0, tickets: 0 };
      partner.tickets += 1;
      partnerMap.set(s[8], partner);
      const user = userMap.get(s[6]) ?? { sales: 0, tickets: 0, qty: 0, refunds: 0 };
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

  const refundAccts = new Set<number>();
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
    const user = userMap.get(r[5]) ?? { sales: 0, tickets: 0, qty: 0, refunds: 0 };
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
      tickets: row?.tickets ?? 0,
    });
    if (daily.length > 400) break;
  }

  const hours = hourSales
    .map((sales, hour) => ({ hour, sales }))
    .filter((h) => h.hour >= 7 && h.hour <= 20);
  let peakHour = 10;
  let peak = -1;
  for (const h of hours) {
    if (h.sales > peak) {
      peak = h.sales;
      peakHour = h.hour;
    }
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
    families: [...familyMap.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.sales - a.sales),
    soldByGood,
    partners: [...partnerMap.entries()]
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => b.sales - a.sales),
    users: [...userMap.entries()]
      .map(([id, row]) => ({ id, ...row }))
      .sort((a, b) => b.sales - a.sales),
    ticketList: [...ticketMap.values()].sort((a, b) => b.ymd - a.ymd || b.hour - a.hour || b.acct - a.acct),
  };
}

function dataUrl() {
  const prefix =
    typeof window === "undefined"
      ? ""
      : (previewPathPrefix(window.location.hostname, window.location.pathname) ?? "");
  return `${prefix}/data/pos.json`;
}

export function PosProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PosData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<RangeKey>("30");
  const [rangeReady, setRangeReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mostrador-range");
    if (saved === "7" || saved === "30" || saved === "90" || saved === "all") setRange(saved);
    setRangeReady(true);
  }, []);

  useEffect(() => {
    if (!rangeReady) return;
    localStorage.setItem("mostrador-range", range);
  }, [range, rangeReady]);

  useEffect(() => {
    let cancelled = false;
    fetch(dataUrl())
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo leer la copia de AxisPOS.");
        return res.json() as Promise<PosData>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "No se pudo leer la copia.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const indexes = useMemo(() => {
    if (!data) return null;
    const goodsById = new Map(data.goods.map((g) => [g.id, g]));
    const usersById = new Map(data.users.map((u) => [u.id, u]));
    const partnersById = new Map(data.partners.map((p) => [p.id, p]));
    const placesById = new Map(data.places.map((p) => [p.id, p]));
    const groupsById = new Map(data.groups.map((g) => [g.id, g]));
    const linesByAcct = new Map<number, Sale[]>();
    for (const sale of data.sales) {
      const list = linesByAcct.get(sale[7]);
      if (list) list.push(sale);
      else linesByAcct.set(sale[7], [sale]);
    }
    const stockByGood = new Map<number, number>();
    for (const row of data.stock) {
      stockByGood.set(row[0], (stockByGood.get(row[0]) ?? 0) + row[2]);
    }
    return { goodsById, usersById, partnersById, placesById, groupsById, linesByAcct, stockByGood };
  }, [data]);

  const view = useMemo(() => {
    if (!data || !indexes) return null;
    return aggregate(data, range, indexes.groupsById, indexes.goodsById);
  }, [data, indexes, range]);

  const value = useMemo<PosState>(() => {
    const goodsById = indexes?.goodsById ?? new Map();
    const usersById = indexes?.usersById ?? new Map();
    const partnersById = indexes?.partnersById ?? new Map();
    const placesById = indexes?.placesById ?? new Map();
    const groupsById = indexes?.groupsById ?? new Map();
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
      linesByAcct: indexes?.linesByAcct ?? new Map(),
      stockByGood: indexes?.stockByGood ?? new Map(),
      stockRows: data?.stock ?? [],
      userName: (id) => usersById.get(id)?.name ?? (id ? `Usuario ${id}` : "—"),
      partnerName: (id) => partnersById.get(id)?.name ?? "Sin socio",
      placeName: (id) => placesById.get(id)?.name ?? "Local",
      familyName: (goodId) => familyOf(goodsById.get(goodId), groupsById),
    };
  }, [data, error, range, view, indexes]);

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
}

export function usePos() {
  const ctx = useContext(PosContext);
  if (!ctx) throw new Error("usePos debe usarse dentro del panel");
  return ctx;
}
