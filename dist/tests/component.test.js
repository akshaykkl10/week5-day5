import { describe, expect, it, vi, beforeEach } from "vitest";
import { Modal } from "@components/modal";
import { Card } from "@components/card";
describe("Modal", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    const dispatch = vi.fn();
    const modal = Modal("Update Task?", 2, dispatch);
    it("Creates Modal with update query", () => {
        const modalComp = modal.querySelector('h2');
        if (modalComp)
            expect(modalComp.textContent).toContain("Update Task?");
    });
    it("submits on form", () => {
        const form = modal.querySelector('form');
        if (!form)
            return;
        const input = form.querySelector('input');
        if (!input)
            return;
        input.value = "New task title";
        form.dispatchEvent(new SubmitEvent("submit", {
            bubbles: true,
            cancelable: true
        }));
        expect(dispatch).toHaveBeenCalledWith({
            type: "TASK_UPDATED",
            payload: {
                task: {
                    id: 2,
                    title: "New task title"
                }
            }
        });
    });
    it("closes the modal on button click", () => {
        const buttons = modal.querySelectorAll("button");
        const closeBtn = buttons[1];
        document.body.append(modal);
        expect(document.body.contains(modal)).toBe(true);
        expect(closeBtn).not.toBeNull();
        closeBtn.click();
        expect(document.body.contains(modal)).toBe(false);
    });
    it("closes the modal on Escape", () => {
        document.body.append(modal);
        expect(document.body.contains(modal)).toBe(true);
        const event = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true
        });
        window.dispatchEvent(event);
        expect(document.body.contains(modal)).toBe(false);
    });
    it("nothing on another key", () => {
        document.body.append(modal);
        expect(document.body.contains(modal)).toBe(true);
        const event = new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true
        });
        window.dispatchEvent(event);
        expect(document.body.contains(modal)).toBe(true);
    });
});
describe("cards", () => {
    it("deletes task", () => {
        const dispatch = vi.fn();
        const card = Card(1, "this is a task", "this is the content", dispatch);
        const buttons = Array.from(card.querySelectorAll('button'));
        const delBtn = buttons.find(button => button.textContent == "delete");
        const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true
        });
        if (delBtn)
            delBtn.dispatchEvent(clickEvent);
        expect(dispatch).toHaveBeenCalledWith({
            type: "TASK_DELETED",
            payload: {
                task: {
                    id: 1
                }
            }
        });
    });
});
//# sourceMappingURL=component.test.js.map