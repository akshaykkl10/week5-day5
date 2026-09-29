import { addTaskForm } from "@components/addTaskForm"
import { Card } from "@components/card"
import type { Action, State } from "@src/types"

export function ListPage(params:{state: State, dispatch: (action: Action) => void}): HTMLElement {
    const div: HTMLElement = document.createElement('div')

    const page = document.createElement('section')
    const h1 = document.createElement('h1')
    h1.textContent = "Tasks"
    div.append(h1)
    params.state.tasks.map((task) => {
        const card = Card(
            task.id,
            task.title,
            "Task description",
            params.dispatch
        );
        
        page.append(card)
    })
    const form = addTaskForm("Enter Task")
    form.classList.add("add")
    form.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()
        const target = event.target
        if(!target) return
        const formData = new FormData(target as HTMLFormElement)
        const title = formData.get('task') as string
        params.dispatch({
            type: "TASK_ADDED",
            payload: {
                title
            }
        })
    })
    page.append(form)
    div.append(page)
    return div
}
