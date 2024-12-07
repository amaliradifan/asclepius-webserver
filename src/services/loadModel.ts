import * as tf from '@tensorflow/tfjs-node';

export async function loadModel() {
  const model = await tf.loadGraphModel(process.env.MODEL_URL as any);
  return model;
}
