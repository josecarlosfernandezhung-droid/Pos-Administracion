import fs from "node:fs";

const sql = fs.readFileSync("/tmp/axispos/axispos_prueba.sql", "utf8");

function rowsFor(table) {
  const rows = [];
  const needle = `INSERT INTO \`${table}\``;
  let from = 0;
  while (from < sql.length) {
    const idx = sql.indexOf(needle, from);
    if (idx < 0) break;
    const v = sql.indexOf("VALUES", idx);
    if (v < 0) break;
    let i = v + 6;
    let depth = 0;
    let inStr = false;
    let tupleStart = -1;
    while (i < sql.length) {
      const c = sql[i];
      if (inStr) {
        if (c === "\\") {
          i += 2;
          continue;
        }
        if (c === "'") {
          if (sql[i + 1] === "'") {
            i += 2;
            continue;
          }
          inStr = false;
        }
        i++;
        continue;
      }
      if (c === "'") {
        inStr = true;
        i++;
        continue;
      }
      if (c === "(") {
        if (depth === 0) tupleStart = i + 1;
        depth++;
        i++;
        continue;
      }
      if (c === ")") {
        depth--;
        if (depth === 0 && tupleStart >= 0) {
          rows.push(parseTuple(sql.slice(tupleStart, i)));
          tupleStart = -1;
        }
        i++;
        continue;
      }
      if (c === ";" && depth === 0) break;
      i++;
    }
    from = i + 1;
  }
  return rows;
}

function parseTuple(body) {
  const vals = [];
  let i = 0;
  while (i < body.length) {
    while (i < body.length && " \n\r\t".includes(body[i])) i++;
    if (i >= body.length) break;
    if (body[i] === ",") {
      i++;
      continue;
    }
    if (body[i] === "'") {
      i++;
      let s = "";
      while (i < body.length) {
        if (body[i] === "\\") {
          const n = body[i + 1] ?? "";
          s += n === "n" ? "\n" : n === "r" ? "\r" : n === "t" ? "\t" : n;
          i += 2;
          continue;
        }
        if (body[i] === "'") {
          if (body[i + 1] === "'") {
            s += "'";
            i += 2;
            continue;
          }
          i++;
          break;
        }
        s += body[i++];
      }
      vals.push(s);
      continue;
    }
    if (body.startsWith("NULL", i)) {
      vals.push(null);
      i += 4;
      continue;
    }
    let j = i;
    while (j < body.length && body[j] !== ",") j++;
    const raw = body.slice(i, j).trim();
    const num = Number(raw);
    vals.push(Number.isFinite(num) ? num : raw);
    i = j;
  }
  return vals;
}

const round = (n) => Math.round((Number(n) || 0) * 100) / 100;
const roundQ = (n) => Math.round((Number(n) || 0) * 1000) / 1000;

function ymdOf(s) {
  if (typeof s !== "string" || s.length < 10) return 0;
  return Number(s.slice(0, 4) + s.slice(5, 7) + s.slice(8, 10));
}
function hourOf(s) {
  if (typeof s !== "string" || s.length < 13) return 0;
  const h = Number(s.slice(11, 13));
  return Number.isFinite(h) ? h : 0;
}

function stampOf(primary, fallback) {
  const y = ymdOf(primary);
  if (y >= 20200101 && y <= 20261231) return primary;
  return fallback;
}

const userGroups = new Map(rowsFor("usersgroups").map((r) => [r[0], r[1]]));
const users = rowsFor("users").map((r) => ({
  id: r[0],
  name: r[2] || `Usuario ${r[0]}`,
  group: userGroups.get(r[5]) || (r[5] === -1 ? "Sistema" : "Sin grupo"),
  level: r[7] ?? 0,
}));

const rawGroups = rowsFor("goodsgroups").map((r) => ({
  id: r[0],
  name: r[1] || "Sin nombre",
  code: r[2] || "",
}));
const byCode = new Map(rawGroups.map((g) => [g.code, g]));
const groups = rawGroups.map((g) => {
  const parentCode = g.code.length > 3 ? g.code.slice(0, g.code.length - 3) : "";
  const parent = parentCode ? byCode.get(parentCode) : undefined;
  return { id: g.id, name: g.name, parentId: parent ? parent.id : null };
});

const goods = rowsFor("goods").map((r) => {
  const price = round(r[15] || r[14] || r[16] || 0);
  return {
    id: r[0],
    code: String(r[1] ?? ""),
    name: r[8] || "Sin nombre",
    groupId: r[31] ?? -1,
    cost: round(r[13] || 0),
    price,
    measure: r[10] || "pzs.",
    active: r[32] === 0,
  };
});

const partnerGroups = { 1: "Cliente", 2: "Proveedor" };
const partners = rowsFor("partners").map((r) => ({
  id: r[0],
  name: r[2] || "Sin nombre",
  kind: partnerGroups[r[27]] || "Socio",
  active: r[29] === 0,
}));

const places = rowsFor("objects").map((r) => ({
  id: r[0],
  name: r[2] || "Local",
  active: r[7] === 0,
}));

const stockMap = new Map();
for (const r of rowsFor("store")) {
  const placeId = r[1];
  const goodId = r[2];
  const qty = Number(r[3]) || 0;
  const cost = Number(r[4]) || 0;
  const key = `${goodId}:${placeId}`;
  let row = stockMap.get(key);
  if (!row) {
    row = { goodId, placeId, qty: 0, costQty: 0, costSum: 0 };
    stockMap.set(key, row);
  }
  row.qty += qty;
  if (qty > 0 && cost > 0) {
    row.costQty += qty;
    row.costSum += qty * cost;
  }
}
const stock = [];
for (const row of stockMap.values()) {
  if (Math.abs(row.qty) < 0.0005) continue;
  const unit = row.costQty > 0 ? row.costSum / row.costQty : 0;
  stock.push([row.goodId, row.placeId, roundQ(row.qty), round(unit)]);
}

const sales = [];
const refunds = [];
const purchases = [];
const signCounts = {};
let discRows = 0;
let refundSample = null;
for (const r of rowsFor("operations")) {
  const type = r[1];
  const when = stampOf(r[22], r[16]);
  const ymd = ymdOf(when);
  const hour = hourOf(when);
  const qty = roundQ(Math.abs(Number(r[7]) || 0));
  let disc = Number(r[13]) || 0;
  if (disc < 0 || disc > 100) disc = 0;
  else disc = round(disc);
  if (type === 2) {
    signCounts[r[8]] = (signCounts[r[8]] || 0) + 1;
    if (disc) discRows++;
    const tuple = [r[3], ymd, hour, qty, round(r[10]), disc, r[21] ?? 0, r[2], r[4] ?? 0, r[5] ?? 0];
    if (Number(r[8]) > 0) refunds.push([r[3], ymd, hour, qty, round(r[10]), r[21] ?? 0, r[2], r[4] ?? 0]);
    else sales.push(tuple);
  } else if (type === 34) {
    if (!refundSample) refundSample = r;
    refunds.push([r[3], ymd, hour, qty, round(r[10] || 0), r[21] ?? 0, r[2], r[4] ?? 0]);
  } else if (type === 1) {
    purchases.push([r[3], ymd, qty, round(r[9] || 0), r[5] ?? 0]);
  }
}

const shifts = rowsFor("shift").map((s) => ({
  id: s[0],
  placeId: s[1],
  open: s[3],
  close: s[4],
  userId: s[5],
  opening: round(s[6]),
  total: round(s[7]),
  withdrawal: round(s[8]),
  diff: round(s[9]),
  status: s[12],
}));

const company = rowsFor("registration")[0]?.[2] || "Tienda";

let minY = 99999999;
let maxY = 0;
let saleSum = 0;
const byPartner = new Map();
for (const s of sales) {
  if (s[1] && s[1] < minY) minY = s[1];
  if (s[1] > maxY) maxY = s[1];
  const amt = s[3] * s[4] * (1 - s[5] / 100);
  saleSum += amt;
  byPartner.set(s[8], (byPartner.get(s[8]) || 0) + amt);
}
let refundSum = 0;
for (const r of refunds) refundSum += r[3] * r[4];

const ticket = sales.filter((s) => s[7] === 26882);
const ticketTotal = ticket.reduce((a, s) => a + s[3] * s[4] * (1 - s[5] / 100), 0);

const goodName = new Map(goods.map((g) => [g.id, g.name]));
const withCost = goods.filter((g) => g.cost > 0).length;
const topStock = [...stock].sort((a, b) => b[2] - a[2]).slice(0, 8).map((s) => ({
  name: goodName.get(s[0]),
  place: s[1],
  qty: s[2],
  cost: s[3],
}));
let stockValue = 0;
let stockUnits = 0;
for (const s of stock) {
  if (s[2] > 0) {
    stockUnits += s[2];
    stockValue += s[2] * s[3];
  }
}

const payload = {
  meta: {
    company,
    asOf: "2026-10-02",
    from: "2026-02-21",
    to: "2026-10-02",
    currency: "CUP",
    usdRate: 740,
  },
  users,
  groups,
  partners,
  places,
  goods,
  stock,
  sales,
  refunds,
  purchases,
  shifts,
};

fs.mkdirSync("/workspace/public/data", { recursive: true });
const json = JSON.stringify(payload);
fs.writeFileSync("/workspace/public/data/pos.json", json);

console.log(
  JSON.stringify(
    {
      bytes: json.length,
      users: users.length,
      groups: groups.length,
      goods: goods.length,
      activeGoods: goods.filter((g) => g.active).length,
      withCost,
      topStock,
      stockRows: stock.length,
      stockUnits: Math.round(stockUnits),
      stockValue: Math.round(stockValue),
      sales: sales.length,
      saleSum: Math.round(saleSum),
      refunds: refunds.length,
      refundSum: Math.round(refundSum),
      purchases: purchases.length,
      shifts: shifts.length,
      signCounts,
      discRows,
      ticket26882: Math.round(ticketTotal),
      ticketLines: ticket.length,
      minY,
      maxY,
      partners: Object.fromEntries(
        [...byPartner.entries()].map(([k, v]) => [k, Math.round(v)]),
      ),
      refundSample,
    },
    null,
    2,
  ),
);
