import type { Action, State, StoreReturn } from "@src/types"

export function createStore(initialState: State, reducer:(state: State, action: Action) => State ): StoreReturn {
    let state = initialState
    function getState(): State {
        return state
    }
    const subscribers: Set<() => void> = new Set()
    function dispatch(action: Action): void{
        state = reducer(state, action)
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
        subscribers.forEach(subscriber => {
            subscriber();
        });
    }
    function subscribe(callback: () => void): () => void {
        subscribers.add(callback);
        return function unsubscribe() {
            subscribers.delete(callback);
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}