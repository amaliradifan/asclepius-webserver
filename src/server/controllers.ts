import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import predictClassification from '../services/inferenceModel';
import storeData from '../services/storeData';
import { getData } from '../services/getData';

export const handlePredict = async (req: Request, res: Response): Promise<any> => {
    if (!req.file) {
        return res.status(400).json({ status: "fail", message: "No image file uploaded" });
    }

    const imageSize = req.file.size;
    if (imageSize > 1 * 1024 * 1024) { // 1MB
        return res.status(413).json({
            status: "fail",
            message: "Payload content length greater than maximum allowed: 1000000"
        });
    }

    try {
        const imageBuffer = req.file.buffer;
        const { label, suggestion } = await predictClassification(req.app.locals.model, imageBuffer);

        const id = uuidv4();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result: label,
            suggestion,
            createdAt,
        };

        await storeData(data, id);

        res.status(201).json({
            status: "success",
            message: "Model is predicted successfully",
            data
        });
    } catch (error) {
        console.error("Prediction error:", error);
        res.status(400).json({ status: "fail", message: "Terjadi kesalahan dalam melakukan prediksi" });
    }
};

export const handleGetPredictions = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await getData();
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        console.error("Get data error:", error);
        res.status(400).json({ status: "fail", message: "Terjadi kesalahan dalam mengambil data" });
    }
};