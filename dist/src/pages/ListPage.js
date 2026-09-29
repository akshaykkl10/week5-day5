import { addTaskForm } from "@components/addTaskForm";
import { Card } from "@components/card";
export function ListPage(params) {
    const div = document.createElement('div');
    const page = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.textContent = "Tasks";
    div.append(h1);
    params.state.tasks.map((task) => {
        const card = Card(task.id, task.title, "Task description", params.dispatch);
        page.append(card);
    });
    const form = addTaskForm("Enter Task");
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