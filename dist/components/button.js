"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
function Button(text, type = "button", className = "") {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.type = type;
    return button;
}
//# sourceMappingURL=button.js.map