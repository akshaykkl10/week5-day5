"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPage = SettingsPage;
function SettingsPage(params) {
    const page = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.textContent = "Settings";
    const p = document.createElement('p');
    p.textContent = "Application settings";
    page.append(h1, p);
    return page;
}
//# sourceMappingURL=SettingsPage.js.map