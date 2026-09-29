import type { Action, RouteComponent } from "../types";
export declare const routes: Map<string, RouteComponent>;
export declare function getRouteFromHash(): {
    path: string;
    params: {
        id?: number;
    };
};
export declare function createRouter(dispatch: (action: Action) => void): {
    register: (path: string, component: RouteComponent) => void;
};
//# sourceMappingURL=router.d.ts.map