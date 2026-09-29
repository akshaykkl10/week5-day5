"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = HomePage;
function HomePage(params) {
    const div = document.createElement('div');
    const page = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.textContent = "Home";
    const p = document.createElement('p');
    p.textContent = "Welcome to the task manager.";
    page.append(p);
    div.append(h1, page);
    return div;
}
//# sourceMappingURL=Homepage.js.map