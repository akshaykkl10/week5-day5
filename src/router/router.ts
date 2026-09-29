import type { Action, RouteComponent } from "@src/types";

export const routes = new Map<string, RouteComponent>()

export function getRouteFromHash(): {
    path: string,
    params: {
        id?: number
    }
}{
    const path = window.location.hash.slice(1) || "/"
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
    }
}

export function createRouter(dispatch: (action: Action) => void):{
    register: (path: string, component:RouteComponent) => void
} {
    function register(path: string, component:RouteComponent): void {
        routes.set(path,component)
    }
    function navigate(path: string) {
        window.location.hash = path
    }
    function handleRoute(path: string){
        let params: {id?:number} = {}
        if (path.startsWith('/detail/')){
            const id = path.split("/")[2]
            params = {
                id: Number(id)
            }
        }
        dispatch({
            type: "ROUTE_CHANGED",
            payload: {
                path,
                params
            }
        })
    }
    document.addEventListener("click", (event: Event) => {
        const target =  event.target as HTMLElement
        if(!target) return
        const linkElement = target.closest("[data-link]");
        if(!linkElement) return;
        event.preventDefault();
        const link = linkElement.getAttribute("href")
        if(!link) return
        navigate(link);
    });
    window.addEventListener("hashchange", () => {
        const path = window.location.hash.slice(1)

        handleRoute(path)
    });
    return {
        register
    }
}

