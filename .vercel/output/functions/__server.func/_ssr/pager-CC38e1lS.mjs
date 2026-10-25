import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pager-CC38e1lS.js
var import_jsx_runtime = require_jsx_runtime();
function Pager({ page, pages, onPage }) {
	if (pages <= 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex items-center justify-between text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-xl px-3 ring-1 ring-line disabled:opacity-40",
				disabled: page <= 1,
				onClick: () => onPage(page - 1),
				children: "Anterior"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums text-muted",
				children: [
					page,
					" / ",
					pages
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 rounded-xl px-3 ring-1 ring-line disabled:opacity-40",
				disabled: page >= pages,
				onClick: () => onPage(page + 1),
				children: "Siguiente"
			})
		]
	});
}
//#endregion
export { Pager as t };
