import { load } from "./common";

const ctx: Worker = self as any; // eslint-disable-line @typescript-eslint/no-explicit-any

ctx.addEventListener("message", (): void => {
    load("WebWorker", (message: string): void => {
        ctx.postMessage(message);
    });
});
