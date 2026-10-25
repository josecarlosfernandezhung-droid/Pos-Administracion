import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, LoadingCopy } from "@/components/app-shell";
import { PosProvider, usePos } from "@/lib/pos";

export const Route = createFileRoute("/_app")({
  component: Layout,
});

function Layout() {
  return (
    <PosProvider>
      <Frame />
    </PosProvider>
  );
}

function Frame() {
  const pos = usePos();
  return (
    <AppShell range={pos.range} setRange={pos.setRange}>
      {pos.error ? (
        <p className="text-sm text-wine" role="alert">
          {pos.error}
        </p>
      ) : pos.view ? (
        <Outlet />
      ) : (
        <LoadingCopy />
      )}
    </AppShell>
  );
}
