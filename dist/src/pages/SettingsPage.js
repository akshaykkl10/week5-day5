export function SettingsPage(params) {
    const page = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.textContent = "Settings";
    const p1 = document.createElement('p');
    p1.textContent = "Application settings";
    const settingsDiv = document.createElement('div');
    const settingshead = document.createElement('h2');
    settingshead.textContent = 'Current State';
    const settings = document.createElement('code');
    settings.textContent = JSON.stringify(params);
    settingsDiv.append(settingshead, settings);
    page.append(h1, p1, settingsDiv);
    return page;
}
//# sourceMappingURL=SettingsPage.js.map