import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions:
        "You are a helpful AI assistant. Answer clearly and concisely.",
      input: req.body.message,
    });

    res.json({
      answer: response.output_text,
      usage: response.usage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get AI response",
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
