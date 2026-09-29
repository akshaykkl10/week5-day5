import { describe, expect, it, vi } from "vitest";
import { HomePage } from "../src/pages/Homepage";
import { ListPage } from "../src/pages/ListPage";
import { SettingsPage } from "../src/pages/SettingsPage";
import { DetailPage } from "../src/pages/DetailPage";
import type { Action, State } from "../src/types";

describe("Homepage", () => {
    it("creates homepage", () => {
        const state: State = {
            route: "",
            params: {},
            tasks: []
        };
        const dispatch = vi.fn();
        const params:{state: State, dispatch: (action: Action) => void} = {state, dispatch}
        const page: HTMLElement = HomePage(params)
        const head = page.querySelector('h1')
        if(!head) return
        expect(head.textContent).toContain("Home")
    })
})


describe("ListPage", () => {
    const state: State = {
        route: "",
        params: {},
        tasks: []
    };

    const dispatch = vi.fn<(action: Action) => void>();
    const params = {
        state,
        dispatch
    }
    it("renders the Tasks heading", () => {
        
        const page = ListPage(params);
        const head = page.querySelector('h1')
        if(!head) return
        expect(head.textContent).toBe("Tasks");
    });
    it("renders card for each task", () => {
        const state = {
            route: "",
            params: {},
            tasks: [
                {
                    id: 1,
                    title: "Learn JavaScript"
                },
                {
                    id: 2,
                    title: "Learn Vitest"
                }
            ]
        };
        const params = {
            state, dispatch
        }
        const page = ListPage(params)
        expect(page.textContent).toContain("Learn JavaScript");
        expect(page.textContent).toContain("Learn Vitest");
    })
    it("dispatches task added when submits form", () => {
        const page = ListPage(params)

        const form = page.querySelector('form') as HTMLInputElement | null
        expect(form).not.toBe(null)
        const input = form?.querySelector('input[name=task') as HTMLInputElement | null
        expect(input).not.toBe(null)
        input!.value = "Learn Typescript"
        const submitEvent = new SubmitEvent("submit", {
            bubbles:true,
            cancelable:true
        })
        form!.dispatchEvent(submitEvent)
        expect(dispatch).toHaveBeenCalledWith({
            type:"TASK_ADDED",
            payload: {
                title: "Learn Typescript"
            }
        })

    })
})

describe("SettingsPage", () => {
    const state: State = {
        route: "",
        params: {},
        tasks: []
    };

    const dispatch = vi.fn<(action: Action) => void>();
    
    const params = {
        state,
        dispatch
    }
    it("creates setting page", () => {
        const page = SettingsPage(params)
        const head = page.querySelector('h1')
        if(!head) return
        expect(head.textContent).toContain("Settings")
    })
})

describe("DetailPage", () => {

    it("creates detail page", () => {
        const dispatch = vi.fn<(action: Action) => void>();
        const state1 = {
            route: "",
            tasks: [
                {
                    id: 1,
                    title: "Learn JavaScript"
                },
                {
                    id: 2,
                    title: "Learn Vitest"
                }
            ],
            params: {
                id:2
            }
        };
        const state2 = {
            route: '',
            tasks: [
                {
                    id: 1,
                    title: "Learn JavaScript"
                },
                {
                    id: 2,
                    title: "Learn Vitest"
                }
            ],
            params: {
                id:3
            }
        };
        const params1 = {
            state:state1, dispatch
        }
        const params2 = {
            state:state2, dispatch
        }
        const page1 = DetailPage(params1)
        const page2 = DetailPage(params2)
        const head = page1.querySelector('h1')
        if(!head) return
        const task = state1.tasks[state1.params.id - 1]

        expect(task).toBeDefined()
        expect(head.textContent).toContain(task!.title)
        expect(page2.textContent).toContain("Task not found")
    })
})