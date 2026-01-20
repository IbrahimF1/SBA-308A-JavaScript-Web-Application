import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// Basic Test Route
app.post('/api/test-generate', async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        console.log(`Received prompt: ${prompt}`);

        // Call Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Return result
        res.json({ success: true, content: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to generate content" });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});