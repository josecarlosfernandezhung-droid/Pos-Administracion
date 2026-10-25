export function Pager({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (page: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-3 flex items-center justify-between text-sm">
      <button
        type="button"
        className="h-11 rounded-xl px-3 ring-1 ring-line disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        Anterior
      </button>
      <span className="tabular-nums text-muted">
        {page} / {pages}
      </span>
      <button
        type="button"
        className="h-11 rounded-xl px-3 ring-1 ring-line disabled:opacity-40"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
