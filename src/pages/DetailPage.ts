import type { Action, State } from "@src/types"

export function DetailPage(params:{ state: State; dispatch: (action: Action) => void }): HTMLElement{
    const taskId = params.state.params.id
    const task = params.state.tasks.find(task => task.id == taskId)
    const h1 = document.createElement('h1')
    if(!task){
        h1.textContent = "Task not found"
        return h1
    }
    const div: HTMLElement = document.createElement('div')
    const page = document.createElement('section')
    h1.textContent = task.title
    const p = document.createElement('p')
    p.textContent = `Task ID: ${task.id}`
    const a = document.createElement('a')
    a.textContent = "Back to Tasks"
    a.href = "/list"
    a.dataset.link = ""
    page.append(
        p,
        a
    )
    div.append(h1, page)
    return div
}