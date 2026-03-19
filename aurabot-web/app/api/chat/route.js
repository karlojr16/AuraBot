import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/firebase-admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { error: "Message es requerido" },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return Response.json(
        { error: "Mensaje demasiado largo" },
        { status: 400 }
      );
    }

    const result = await model.generateContent(message);
    const text = result.response.text();

    // Guardar en Firestore
    await db.collection("chats").add({
message,
reply: text,
    createdAt: new Date(),
    });

    return Response.json({ reply: text });

} catch (error) {
    console.error("Gemini Error:", error);

    return Response.json(
    { error: "Error interno del servidor" },
    { status: 500 }
    );
}
}