import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'AI request failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
