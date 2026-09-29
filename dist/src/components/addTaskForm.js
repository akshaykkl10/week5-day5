import { Button } from "@components/button";
export function addTaskForm(placeholder) {
    const form = document.createElement("form");
    const taskIn = document.createElement('input');
    taskIn.type = "text";
    taskIn.name = "task";
    taskIn.placeholder = placeholder;
    const button = Button("Submit", "submit");
    form.append(taskIn, button);
    return form;
}
//# sourceMappingURL=addTaskForm.js.map