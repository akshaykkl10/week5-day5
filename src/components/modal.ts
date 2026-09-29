import type { Action } from "@src/types";
import { addTaskForm } from "@components/addTaskForm";
import { Button } from "@components/button";

export function Modal(title: string, id: number, dispatch: (action: Action)=> void):HTMLDivElement {

    const modal: HTMLDivElement = document.createElement("div");

    modal.className = "modal";

    const heading: HTMLHeadingElement = document.createElement("h2");
    heading.textContent = title;

    const form: HTMLFormElement = addTaskForm("Update Task");

    const closeButton: HTMLButtonElement = Button("Close");

    modal.append(
        heading,
        form,
        closeButton
    );
    form.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()
        const taskIn: HTMLInputElement | null = form.querySelector('[name="task"]')
        if (!taskIn) return
        const newTask: string = taskIn.value;
        dispatch({
            type: "TASK_UPDATED",
            payload: {
                task:{
                    id,
                    title:newTask
                }
            }
        })
    })
    closeButton.addEventListener("click", (): void  =>{
        modal.remove()
    })
    window.addEventListener("keydown", (event: KeyboardEvent): void  =>{
        if(event.key == "Escape"){
            event.preventDefault()
            modal.remove()
        }
    })
    return modal;
}