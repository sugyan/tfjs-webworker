import * as tf from "@tensorflow/tfjs";
import Worker from "worker-loader!./worker";

const worker = new Worker();
const modelUrl = 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';

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

window.addEventListener("DOMContentLoaded", (): void => {
    worker.addEventListener("message", (event): void => {
        writeMessage(event.data);
    });

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
            writeMessage("start loading model in MainThread...")
            tf.loadGraphModel(modelUrl).then((model): void => {
                writeMessage(`model was loaded. backend: ${tf.getBackend()}`);
                for (let i = 0; i < 20; i++) {
                    const zeros = tf.randomNormal([1, 224, 224, 3]);
                    const result: tf.Tensor = model.predict(zeros) as tf.Tensor;
                    result.dispose();
                    writeMessage("predicted by model.");
                    zeros.dispose();
                }
                model.dispose();
                console.log(tf.memory())
            });
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
