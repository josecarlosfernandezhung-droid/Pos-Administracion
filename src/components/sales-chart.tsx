import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cup, cupCompact, formatYmd } from "@/lib/format";

type Point = { ymd: number; sales: number };

export function SalesChart({ daily }: { daily: Point[] }) {
  const points = bucket(daily).map((p) => ({ ...p, label: formatYmd(p.ymd) }));
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval={points.length > 12 ? Math.ceil(points.length / 6) : 0}
          />
          <YAxis
            tickFormatter={(v: number) => cupCompact(v)}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip content={<SalesTip />} />
          <Area
            type="monotone"
            dataKey="sales"
            name="Ventas"
            stroke="var(--color-copper)"
            fill="var(--color-copper)"
            fillOpacity={0.16}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-copper)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function bucket(daily: Point[]) {
  if (daily.length <= 45) return daily;
  const out: Point[] = [];
  for (let i = 0; i < daily.length; i += 7) {
    const slice = daily.slice(i, i + 7);
    out.push({
      ymd: slice[0]?.ymd ?? 0,
      sales: slice.reduce((sum, day) => sum + day.sales, 0),
    });
  }
  return out;
}

function SalesTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-ink px-3 py-2 text-xs text-bg">
      <p className="text-sidebar-muted">{label}</p>
      <p className="mt-1 font-medium tabular-nums">{cup(payload[0]?.value ?? 0)}</p>
    </div>
  );
}
