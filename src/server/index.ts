import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import { loadModel } from '../services/loadModel';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main(): Promise<void> {
    try {
        const model = await loadModel(); 
        app.locals.model = model; 

        app.listen(PORT, '0.0.0.0', (): void => {
            console.log(`⚡️ [SERVER]: Server running at localhost:${PORT}`);
        });
    } catch (err: any) {
        console.error('Error loading model:', err);
        process.exit(1); // Hentikan proses jika model gagal dimuat
    }
}

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.use(routes);

main();
