import { describe, expect, it, vi } from "vitest";
import { createStore } from "../src/utils/store.js";
import type { State, Action } from "../src/types"

export function reducer(state: State, action: Action) {
    if (action.type == "TASK_ADDED") {
        return {
            ...state,
            tasks:[
                ...state.tasks,
                {
                    id: Date.now(),
                    title: action.payload.title
                }
            ]
        }
    }

    return state;
}

describe("store", () => {
    
    
    it("getstate", () => {
        const state = {
            tasks: [],
            route: "",
            params: {}
        }
        const store = createStore(
            state,
            reducer
        );
        expect(store.getState()).toEqual(state)
    })
    it("changes state when an action is dispatched", () => {
        const state = {
            tasks: [],
            route: "",
            params: {}
        }
        const store = createStore(
            state,
            reducer
        );

        store.dispatch({
            type: "TASK_ADDED",
            payload: {
                title: "akshay"
            }
        });
        const stateNew = store.getState()
        expect(stateNew.tasks[0]!.title).toBe("akshay");
    });
    it("checks the subscription calling", () => {
        const state = {
            tasks: [],
            route: "",
            params: {}
        }
        const store = createStore(
            state,
            reducer
        );

        const subscriber = vi.fn<() => void>();

        store.subscribe(subscriber);

        store.dispatch({
            type: "TASK_ADDED",
            payload: {
                title: 'ak'
            }
        });

        expect(subscriber).toHaveBeenCalledTimes(1);
    })

})

