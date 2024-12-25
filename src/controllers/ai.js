import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function ai(req, res) {
  const data = req.body;

  try {
    if (!data.content || !data.role) {
      return res
        .json({ error: { message: "Missing required fields" } })
        .status(400);
    }

    if (data.role !== "user") {
      return res.json({ error: { message: "Invalid role" } }).status(400);
    }

    const chatComplation = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `jawab dalam bahasa indonesia. ${data.content}`,
        },
      ],
      model: "llama3-8b-8192",
    });

    return res.json({
      message: [
        { role: "user", contain: data.content },
        {
          role: chatComplation.choices[0].message.role,
          content: chatComplation.choices[0].message.content,
        },
      ],
    });
  } catch (error) {
    throw new Error(error);
  }
}
