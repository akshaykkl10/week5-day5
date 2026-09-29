import type { Action, State } from "@src/types";

export function HomePage(params:{ state: State; dispatch: (action: Action) => void }): HTMLElement {
    const div:HTMLElement = document.createElement('div')
    const page = document.createElement('section')
    const h1 = document.createElement('h1')
    h1.textContent = "Home"
    const p1 = document.createElement('p')
    p1.textContent = "Welcome to the task manager."
    const p2 = document.createElement('p')
    p2.textContent = `Total number of tasks are ${params.state.tasks.length}`
    page.append(p1, p2)
    div.append(h1, page)
    return div
}