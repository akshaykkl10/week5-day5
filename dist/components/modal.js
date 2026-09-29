"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = Modal;
const addTaskForm_js_1 = require("./addTaskForm.js");
const button_js_1 = require("./button.js");
function Modal(title, id, dispatch) {
    const modal = document.createElement("div");
    modal.className = "modal";
    const heading = document.createElement("h2");
    heading.textContent = title;
    const form = (0, addTaskForm_js_1.addTaskForm)("Update Task");
    const closeButton = (0, button_js_1.Button)("Close");
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