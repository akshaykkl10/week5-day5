import { Button } from "@components/button"

export function addTaskForm(placeholder: string): HTMLFormElement {
    const form: HTMLFormElement = document.createElement("form")
    const taskIn: HTMLInputElement = document.createElement('input')
    taskIn.type = "text"
    taskIn.name = "task"
    taskIn.placeholder = placeholder
    const button: HTMLButtonElement = Button("Submit","submit")
    form.append(taskIn, button)
    return form
}