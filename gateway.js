require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

// Generar texto con OpenAI
app.post("/api/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a creative story generator." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    res.json({ story: data.choices[0]?.message?.content || "No response received." });
  } catch (error) {
    console.error("Error en /generate-text:", error);
    res.status(500).json({ error: "Fallo al generar texto." });
  }
});

// Generar audio con OpenAI
app.post("/api/generate-audio", async (req, res) => {
  try {
    const { text, voice } = req.body;

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: voice || "alloy",
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      throw new Error("Fallo al generar voz.");
    }

    const audioBuffer = await response.arrayBuffer();
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.byteLength,
    });
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error("Error en /generate-audio:", error);
    res.status(500).json({ error: "Fallo al generar audio." });
  }
});

// Iniciar el API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en: http://localhost:${PORT}`);
});
