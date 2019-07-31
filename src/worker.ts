import * as tf from "@tensorflow/tfjs";

const ctx: Worker = self as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const modelUrl = 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';

ctx.addEventListener("message", (): void => {
    ctx.postMessage("start loading model in WebWorker...")
    tf.loadGraphModel(modelUrl).then((model): void => {
        ctx.postMessage(`model was loaded. backend: ${tf.getBackend()}`)
        for (let i = 0; i < 20; i++) {
            const zeros = tf.randomNormal([1, 224, 224, 3]);
            const result: tf.Tensor = model.predict(zeros) as tf.Tensor;
            result.dispose();
            ctx.postMessage("predicted by model.")
            zeros.dispose();
        }
        model.dispose();
        console.log(tf.memory())
    });
})
