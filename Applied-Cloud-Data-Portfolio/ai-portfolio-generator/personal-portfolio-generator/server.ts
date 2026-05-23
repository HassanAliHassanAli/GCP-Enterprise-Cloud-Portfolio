import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to parse resume text and generate formatted portfolio
  app.post("/api/generate", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "Text contents are required." });
      }

      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY environment variable is not configured on the server. Please add it in Settings > Secrets." 
        });
      }

      const prompt = `You are a professional website designer and resume analyzer. Given the unstructured raw resume, background text, or LinkedIn biography, parse and reorganize the data into a stellar personal portfolio. Create an engaging, narrative About Me summary, and organize experiences and education accurately. Make up placeholder URLs or logical email addresses if they are missing.

Raw Information:
"""
${text}
"""`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional personal portfolio builder assistant. Reformat work history and skills into concise, polished entries. Select one strong color accent ('emerald', 'indigo', 'violet', 'sky', 'amber', or 'rose') that fits their profession. Ensure everything aligns perfectly.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The full name of the portfolio owner." },
              title: { type: Type.STRING, description: "Professional subtitle / current target job title (e.g. Senior Software Engineer)." },
              tagline: { type: Type.STRING, description: "A short, memorable professional slogan/mantra." },
              aboutMe: { type: Type.STRING, description: "A professional and modern biography in first-person (e.g., 'I am a...')." },
              experience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    role: { type: Type.STRING, description: "Job title / role" },
                    company: { type: Type.STRING, description: "Company name" },
                    period: { type: Type.STRING, description: "Time period (e.g., '2021 - Present')" },
                    description: { type: Type.STRING, description: "High-impact summary or bullet points of key outcomes and achievements." }
                  },
                  required: ["role", "company", "period", "description"]
                }
              },
              education: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    degree: { type: Type.STRING, description: "Degree / certification / study" },
                    school: { type: Type.STRING, description: "University or institution name" },
                    period: { type: Type.STRING, description: "Time period (e.g., '2017 - 2021')" },
                    description: { type: Type.STRING, description: "Academic notes, GPA or honors if any (optional, can be empty string)" }
                  },
                  required: ["degree", "school"]
                }
              },
              skills: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING, description: "Skill sector (e.g. 'Technical Skills', 'Soft Skills', 'Methodologies')" },
                    items: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["category", "items"]
                }
              },
              contact: {
                type: Type.OBJECT,
                    properties: {
                  email: { type: Type.STRING },
                  location: { type: Type.STRING },
                  linkedin: { type: Type.STRING },
                  github: { type: Type.STRING }
                }
              },
              aestheticAccent: { type: Type.STRING, description: "Choose exactly one fit for their profession: emerald, indigo, violet, sky, amber, or rose" }
            },
            required: ["name", "title", "tagline", "aboutMe", "experience", "education", "skills", "contact", "aestheticAccent"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini model.");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (error: any) {
      console.error("Portfolio Generator Error:", error);
      res.status(500).json({ error: error?.message || "An unexpected error occurred during parsing." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
