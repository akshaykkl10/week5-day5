import { addTaskForm } from "@components/addTaskForm";
import { Button } from "@components/button";
export function Modal(title, id, dispatch) {
    const modal = document.createElement("div");
    modal.className = "modal";
    const heading = document.createElement("h2");
    heading.textContent = title;
    const form = addTaskForm("Update Task");
    const closeButton = Button("Close");
    modal.append(heading, form, closeButton);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskIn = form.querySelector('[name="task"]');
        if (!taskIn)
            return;
        const newTask = taskIn.value;
        dispatch({
            type: "TASK_UPDATED",
            payload: {
                task: {
                    id,
                    title: newTask
                }
            }
        });
    });
    closeButton.addEventListener("click", () => {
        modal.remove();
    });
    window.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            event.preventDefault();
            modal.remove();
        }
    });
    return modal;
}
//# sourceMappingURL=modal.js.map