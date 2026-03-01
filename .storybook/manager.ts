import { addons } from "@storybook/manager-api";

// HACK FIX TO HIDE THE ADDONS PANEL.
// Original idea at: https://github.com/storybookjs/storybook/discussions/26058.
function waitForAddonsButton(timeout?: number): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
        let timer: ReturnType<typeof setTimeout> | undefined = undefined;

        const observer = new MutationObserver(() => {
            const el = document.querySelector('button[title^="Hide addons"]');
            if (!(el instanceof HTMLElement)) return;

            observer.disconnect();
            if (timer !== undefined) clearTimeout(timer);
            resolve(el);
        });

        timer = setTimeout(() => {
            observer.disconnect();
            reject(new Error("waitForAddonsButton timed out"));
        }, timeout);

        observer.observe(document.body, { childList: true, subtree: true });
    });
}

addons.ready().then(() => {
    waitForAddonsButton(1000)
        .then(closeAddonsButton => {
            if (sessionStorage.getItem("addons-hidden") === "true") return;
            closeAddonsButton.click();
            sessionStorage.setItem("addons-hidden", "true");
        })
        .catch(console.error.bind(console));
});
