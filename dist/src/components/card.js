import { Button } from "@components/button";
import { Modal } from "@components/modal";
export function Card(id, title, content, dispatch) {
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
    const upButton = Button("update");
    const delButton = Button("delete");
    card.append(heading, paragraph, itemLink, upButton, delButton);
    upButton.addEventListener("click", () => {
        const modal = Modal("Update task?", id, dispatch);
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