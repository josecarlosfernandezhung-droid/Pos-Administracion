const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function ymdToUtc(ymd: number) {
  const s = String(ymd).padStart(8, "0");
  return new Date(Date.UTC(Number(s.slice(0, 4)), Number(s.slice(4, 6)) - 1, Number(s.slice(6, 8))));
}

export function utcToYmd(d: Date) {
  return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
}

export function addDays(ymd: number, days: number) {
  const d = ymdToUtc(ymd);
  d.setUTCDate(d.getUTCDate() + days);
  return utcToYmd(d);
}

export function isoToYmd(iso: string) {
  return Number(iso.slice(0, 4) + iso.slice(5, 7) + iso.slice(8, 10));
}

export function formatYmd(ymd: number) {
  const s = String(ymd).padStart(8, "0");
  const month = MONTHS[Number(s.slice(4, 6)) - 1] ?? "";
  return `${Number(s.slice(6, 8))} ${month}`;
}

export function formatYmdLong(ymd: number) {
  const s = String(ymd).padStart(8, "0");
  const month = MONTHS[Number(s.slice(4, 6)) - 1] ?? "";
  return `${Number(s.slice(6, 8))} ${month} ${s.slice(0, 4)}`;
}

export function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function ticketLabel(acct: number) {
  return String(Math.trunc(acct)).padStart(10, "0");
}

export function cup(n: number) {
  const digits = Math.abs(n - Math.round(n)) < 0.005 ? 0 : 2;
  const formatted = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
  return `${formatted} CUP`;
}

export function cupCompact(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1_000_000) {
    const v = abs / 1_000_000;
    const digits = v >= 10 ? 1 : 2;
    return `${sign}${v.toFixed(digits)} M`;
  }
  if (abs >= 10_000) return `${sign}${Math.round(abs / 1000)} mil`;
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(n);
}

export function usdApprox(n: number, rate: number) {
  const v = n / rate;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

export function qty(n: number) {
  const digits = Math.abs(n - Math.round(n)) < 0.001 ? 0 : 2;
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: digits }).format(n);
}

export function pct(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(n)}%`;
}

export function shiftStamp(value: string | null) {
  if (!value) return "—";
  const ymd = Number(value.slice(0, 4) + value.slice(5, 7) + value.slice(8, 10));
  const hm = value.length >= 16 ? value.slice(11, 16) : "";
  return hm ? `${formatYmd(ymd)} ${hm}` : formatYmd(ymd);
}
