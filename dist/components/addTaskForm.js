"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaskForm = addTaskForm;
const button_js_1 = require("@components/button.js");
function addTaskForm(placeholder) {
    const form = document.createElement("form");
    const taskIn = document.createElement('input');
    taskIn.type = "text";
    taskIn.name = "task";
    taskIn.placeholder = placeholder;
    const button = (0, button_js_1.Button)("Submit", "submit");
    form.append(taskIn, button);
    return form;
}
//# sourceMappingURL=addTaskForm.js.map