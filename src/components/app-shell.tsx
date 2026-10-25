import { Link, useRouterState } from "@tanstack/react-router";
import { Boxes, Landmark, LayoutDashboard, Package, Receipt, Users } from "lucide-react";
import type { ReactNode } from "react";
import type { RangeKey } from "@/lib/pos";

const NAV = [
  { to: "/", label: "Resumen", icon: LayoutDashboard },
  { to: "/ventas", label: "Ventas", icon: Receipt },
  { to: "/productos", label: "Productos", icon: Package },
  { to: "/existencias", label: "Existencias", icon: Boxes },
  { to: "/caja", label: "Caja", icon: Landmark },
  { to: "/equipo", label: "Equipo", icon: Users },
] as const;

const RANGES: { id: RangeKey; label: string }[] = [
  { id: "7", label: "7 días" },
  { id: "30", label: "30 días" },
  { id: "90", label: "90 días" },
  { id: "all", label: "Todo" },
];

export function AppShell({
  range,
  setRange,
  children,
}: {
  range: RangeKey;
  setRange: (range: RangeKey) => void;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-bg text-ink md:flex">
      <aside className="hidden md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col md:bg-sidebar md:text-sidebar-fg">
        <div className="px-5 pt-6 pb-4">
          <Brand />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Secciones">
          {NAV.map((item) => (
            <NavLink key={item.to} item={item} pathname={pathname} />
          ))}
        </nav>
        <p className="px-5 pb-6 text-xs leading-5 text-sidebar-muted">
          Copia AxisPOS del 2 oct 2026
          <br />
          Tienda · pesos cubanos
        </p>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm">
          <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="md:hidden">
              <Brand compact />
            </div>
            <p className="hidden text-sm text-muted md:block">Puesto del computador · la misma vista abre en el teléfono</p>
            <div className="flex w-full rounded-full bg-surface p-1 ring-1 ring-line md:w-auto" role="group" aria-label="Periodo">
              {RANGES.map((item) => {
                const on = item.id === range;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setRange(item.id)}
                    className={
                      on
                        ? "h-9 flex-1 rounded-full bg-ink px-3 text-sm text-bg md:flex-none"
                        : "h-9 flex-1 rounded-full px-3 text-sm text-muted md:flex-none"
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden" aria-label="Secciones">
            {NAV.map((item) =>
              item.to === "/ventas" ? (
                <Link
                  key={item.to}
                  to="/ventas"
                  search={{ good: undefined }}
                  className={
                    isActive(pathname, item.to)
                      ? "shrink-0 rounded-full bg-ink px-3 py-2 text-sm text-bg"
                      : "shrink-0 rounded-full bg-surface px-3 py-2 text-sm text-muted ring-1 ring-line"
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    isActive(pathname, item.to)
                      ? "shrink-0 rounded-full bg-ink px-3 py-2 text-sm text-bg"
                      : "shrink-0 rounded-full bg-surface px-3 py-2 text-sm text-muted ring-1 ring-line"
                  }
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </header>
        <main className="w-full px-4 py-5 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-copper font-display text-lg text-sidebar-fg">
        M
      </span>
      {!compact && (
        <span>
          <span className="block font-display text-xl leading-none">Mostrador</span>
          <span className="mt-1 block text-xs text-sidebar-muted">Tienda</span>
        </span>
      )}
      {compact && <span className="font-display text-xl leading-none">Mostrador</span>}
    </div>
  );
}

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

function NavLink({
  item,
  pathname,
}: {
  item: (typeof NAV)[number];
  pathname: string;
}) {
  const on = isActive(pathname, item.to);
  const Icon = item.icon;
  const className = on
    ? "flex h-11 items-center gap-3 rounded-xl bg-sidebar-line px-3 text-sm text-sidebar-fg"
    : "flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-sidebar-muted hover:bg-sidebar-line hover:text-sidebar-fg";
  if (item.to === "/ventas") {
    return (
      <Link to="/ventas" search={{ good: undefined }} className={className}>
        <Icon className="size-4" aria-hidden="true" />
        {item.label}
      </Link>
    );
  }
  return (
    <Link to={item.to} className={className}>
      <Icon className="size-4" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

export function PageIntro({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="mb-5">
      <h1 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">{lede}</p>
    </header>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl bg-surface p-4 ring-1 ring-line md:p-5 ${className}`}>{children}</section>;
}

export function LoadingCopy() {
  return (
    <div className="space-y-4" aria-busy="true">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Mostrador</h1>
        <p className="mt-1 text-sm text-muted">Leyendo ventas, existencias y caja de la copia AxisPOS…</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="h-36 rounded-2xl bg-surface ring-1 ring-line" />
        <div className="h-36 rounded-2xl bg-surface ring-1 ring-line" />
        <div className="h-36 rounded-2xl bg-surface ring-1 ring-line" />
      </div>
      <div className="h-64 rounded-2xl bg-surface ring-1 ring-line" />
    </div>
  );
}
