type btnTypes =  "button" | "submit"  | "reset"

export function Button(text: string, type: btnTypes = "button" , className: string = ""): HTMLButtonElement {

    const button:HTMLButtonElement = document.createElement("button");

    button.textContent = text;
    button.className = className;
    button.type = type

    return button;
}