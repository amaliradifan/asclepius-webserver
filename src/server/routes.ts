import express from 'express';
import { handleGetPredictions, handlePredict } from './controllers';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

router.use(express.json({ limit: '1mb' }));

router.post('/predict', upload.single('image'), handlePredict);
router.get('/predict/histories', handleGetPredictions);

export default router;
