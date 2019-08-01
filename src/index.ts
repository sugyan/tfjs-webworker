import Worker from "worker-loader!./worker";
import { load } from "./common";

function writeMessage(line: string): void {
    const message = document.getElementById("message");
    if (message) {
        message.textContent += `${new Date().toISOString()}: ${line}\n`;
    }
}

function clearMessage(): void {
    const message = document.getElementById("message");
    if (message) {
        message.textContent = "";
    }
}

const worker = new Worker();

worker.addEventListener("message", (event): void => {
    writeMessage(event.data);
});

window.addEventListener("DOMContentLoaded", (): void => {
    const time = (): void => {
        const t = document.getElementById("time");
        if (t) {
            t.textContent = new Date().toISOString();
        }
        window.requestAnimationFrame(time);
    }
    window.requestAnimationFrame(time);

    const run1 = document.getElementById("run1")
    if (run1) {
        run1.onclick = (): void => {
            clearMessage();
            load("MainThread", (message: string): void => {
                writeMessage(message);
            })
        };
    }
    const run2 = document.getElementById("run2")
    if (run2) {
        run2.onclick = (): void => {
            clearMessage();
            worker.postMessage("run");
        };
    }
});
