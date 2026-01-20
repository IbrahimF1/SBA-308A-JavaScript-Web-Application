import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


app.post('/api/generate', async (req: Request, res: Response) => {
    try {
        const { title, subheading } = req.body;
        
        
        const prompt = `Write a concise, informative article (approx 150 words) for a web developer about: "${title}". Context: ${subheading}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        
        res.json({ success: true, content: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Generation failed" });
    }
});

app.use(express.static('frontend'));

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
