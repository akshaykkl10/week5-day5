"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.getRouteFromHash = getRouteFromHash;
exports.createRouter = createRouter;
exports.routes = new Map();
function getRouteFromHash() {
    const path = window.location.hash.slice(1) || "/";
    if (path.startsWith("/detail/")) {
        const id = path.split("/")[2];
        return {
            path,
            params: {
                id: Number(id)
            }
        };
    }
    return {
        path,
        params: {}
    };
}
function createRouter(dispatch) {
    function register(path, component) {
        exports.routes.set(path, component);
    }
    function navigate(path) {
        window.location.hash = path;
    }
    function handleRoute(path) {
        let params = {};
        if (path.startsWith('/detail/')) {
            const id = path.split("/")[2];
            params = {
                id: Number(id)
            };
        }
        dispatch({
            type: "ROUTE_CHANGED",
            payload: {
                path,
                params
            }
        });
    }
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!target)
            return;
        const linkElement = target.closest("[data-link]");
        if (!linkElement)
            return;
        event.preventDefault();
        const link = linkElement.getAttribute("href");
        if (!link)
            return;
        navigate(link);
    });
    window.addEventListener("hashchange", () => {
        const path = window.location.hash.slice(1);
        handleRoute(path);
    });
    return {
        register
    };
}
//# sourceMappingURL=router.js.map