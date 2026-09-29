"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const button_js_1 = require("./button.js");
const modal_1 = require("@components/modal");
function Card(id, title, content, dispatch) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.id = String(id);
    const heading = document.createElement("h2");
    heading.textContent = title;
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    const itemLink = document.createElement('a');
    itemLink.textContent = "Task details";
    itemLink.href = `/detail/${id}`;
    itemLink.dataset.link = "";
    const upButton = (0, button_js_1.Button)("update");
    const delButton = (0, button_js_1.Button)("delete");
    card.append(heading, paragraph, itemLink, upButton, delButton);
    upButton.addEventListener("click", () => {
        const modal = (0, modal_1.Modal)("Update task?", id, dispatch);
        card.append(modal);
    });
    delButton.addEventListener('click', () => {
        dispatch({
            type: "TASK_DELETED",
            payload: {
                task: {
                    id
                }
            }
        });
    });
    return card;
}
//# sourceMappingURL=card.js.map