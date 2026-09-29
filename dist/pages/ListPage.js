"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPage = ListPage;
const addTaskForm_js_1 = require("../components/addTaskForm.js");
const card_js_1 = require("../components/card.js");
function ListPage(params) {
    const div = document.createElement('div');
    const page = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.textContent = "Tasks";
    div.append(h1);
    params.state.tasks.map((task) => {
        const card = (0, card_js_1.Card)(task.id, task.title, "Task description", params.dispatch);
        page.append(card);
    });
    const form = (0, addTaskForm_js_1.addTaskForm)("Enter Task");
    form.classList.add("add");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target)
            return;
        const formData = new FormData(target);
        const title = formData.get('task');
        params.dispatch({
            type: "TASK_ADDED",
            payload: {
                title
            }
        });
    });
    page.append(form);
    div.append(page);
    return div;
}
//# sourceMappingURL=ListPage.js.map