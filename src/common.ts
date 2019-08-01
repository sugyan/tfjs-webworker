import * as tf from "@tensorflow/tfjs";

const modelUrl = 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';

export function load(env: string, sendMessage: (message: string) => void): void {
    sendMessage(`start loading model in ${env}...`)
    tf.loadGraphModel(modelUrl).then((model): void => {
        sendMessage(`model was loaded. backend: ${tf.getBackend()}`)
        for (let i = 0; i < 25; i++) {
            const zeros = tf.randomNormal([1, 224, 224, 3]);
            const result: tf.Tensor = model.predict(zeros) as tf.Tensor;
            result.dispose();
            sendMessage("predicted by model.")
            zeros.dispose();
        }
        model.dispose();
        console.log(tf.memory())
        sendMessage("finished.")
    });
}
