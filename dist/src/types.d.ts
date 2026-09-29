export interface State {
    route: string;
    params: {
        id?: number;
    };
    tasks: Task[];
}
export type StoreReturn = {
    getState(): State;
    dispatch(action: Action): void;
    subscribe(callback: () => void): () => void;
};
export interface Task {
    id: number;
    title: string;
}
export type Action = {
    type: 'ROUTE_CHANGED';
    payload: {
        path: string;
        params: {
            id?: number;
        };
    };
} | {
    type: 'TASK_ADDED';
    payload: {
        title: string;
    };
} | {
    type: 'TASK_DELETED';
    payload: {
        task: {
            id: number;
        };
    };
} | {
    type: 'TASK_UPDATED';
    payload: {
        task: {
            id: number;
            title: string;
        };
    };
};
export type RouteComponent = (params: {
    state: State;
    dispatch: (action: Action) => void;
}) => HTMLElement;
//# sourceMappingURL=types.d.ts.map