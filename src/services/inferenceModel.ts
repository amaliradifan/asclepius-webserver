import * as tf from '@tensorflow/tfjs-node';
import InputError from '../exceptions/InputError';

export default async function predictClassification(model: any, image: Buffer) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();


        const prediction = model.predict(tensor) as tf.Tensor;
        const score = await prediction.data(); 
        const predictedClass = score[0] > 0.5 ? 'Cancer' : 'Non-cancer';
        const label = predictedClass; 

        let suggestion: string = "";

        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!";
        } else if (label === 'Non-cancer') {
            suggestion = "Penyakit kanker tidak terdeteksi.";
        }

        return { label, suggestion };
    } catch (error: any) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi: ${error.message}`);
    }
}

