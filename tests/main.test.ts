import { routes } from "@router/router";
import { reducer, render, store } from "@src/main";
import { Action, State } from "@src/types";
import { describe, expect, it, vi } from "vitest";

describe("reducer", () => {
    const state: State = {
        tasks: [],
        route: "",
        params: {}
    }
    it("Changes Routes", () => {
        const action: Action = {
            type:"ROUTE_CHANGED",
            payload:{
                path:"/",
                params:{
                    id:1
                }
            }
        }
        const changedState = {
            tasks: [],
            route: "/",
            params: {
                id:1
            }
        }
        expect(reducer(state, action)).toEqual(changedState)
    })
    it("Task Added", () => {
        const action: Action = {
            type:"TASK_ADDED",
            payload:{
                title:"test task"
            }
        }
        const nextState = reducer(state, action)

        expect(nextState.tasks).toHaveLength(1)
        expect(nextState.tasks[0]!.title).toEqual("test task")
    })
    it("task delete", () => {
        const state = {
            tasks: [
                {
                    id:1,
                    title:"deleting task"
                }
            ],
            route: "",
            params: {}
        }
        const action: Action = {
            type:"TASK_DELETED",
            payload:{
                task:{
                    id:1
                }
            }
        }
        const changedState = {
            tasks: [],
            route: "",
            params: {}
        }
        expect(reducer(state, action)).toEqual(changedState)
    })
    it("task update", () => {
        const state = {
            tasks: [
                {
                    id:1,
                    title:"task"
                }
            ],
            route: "",
            params: {}
        }
        const action: Action = {
            type:"TASK_UPDATED",
            payload:{
                task:{
                    id:1,
                    title: "updated task"
                }
            }
        }
        const changedState = {
            tasks: [
                {
                    id:1,
                    title:"updated task"
                }
            ],
            route: "",
            params: {}
        }
        expect(reducer(state, action)).toEqual(changedState)
    })
})

describe('render', () => {
    it("returns when app does not exist", () => {
        document.body.innerHTML = "";

        expect(() => render()).not.toThrow();
    });
    it("renders the component for a normal route ", () => {
        document.body.innerHTML = '<main id="app"></main>';
        const component = vi.fn(() => {
            const element = document.createElement("div");
            element.textContent = "List";
            return element;
        });
        routes.set("/list", component)
        store.dispatch({
            type: "ROUTE_CHANGED",
            payload: {
                path: "/list",
                params: {}
            }
        })
        render()
        expect(component).toHaveBeenCalled();
        const text = document.querySelector("#app")
        if(text)
        expect(text.textContent).toContain("List");
    })
    it("renders the component for a detail route ", () => {
        document.body.innerHTML = '<main id="app"></main>';
        const component = vi.fn(() => {
            const element = document.createElement("div");
            element.textContent = "Details";
            return element;
        });
        routes.set("/detail", component)
        store.dispatch({
            type: "ROUTE_CHANGED",
            payload: {
                path: "/detail/2",
                params: {
                    id:2
                }
            }
        })
        render()
        expect(component).toHaveBeenCalledTimes(2);
        const text = document.querySelector("#app")
        if(text)
        expect(text.textContent).toContain("Details");
    })
    
})