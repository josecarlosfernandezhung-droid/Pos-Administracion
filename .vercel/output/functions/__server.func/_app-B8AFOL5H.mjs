import { S as require_jsx_runtime, g as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as usePos, a as PosProvider, n as LoadingCopy, t as AppShell } from "./_ssr/pos-Deo1d8sh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-B8AFOL5H.js
var import_jsx_runtime = require_jsx_runtime();
function Layout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {}) });
}
function Frame() {
	const pos = usePos();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		range: pos.range,
		setRange: pos.setRange,
		children: pos.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-wine",
			role: "alert",
			children: pos.error
		}) : pos.view ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingCopy, {})
	});
}
//#endregion
export { Layout as component };
