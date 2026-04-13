import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processTicketWithAI = async (description) => {
  const prompt = `
You are a support assistant.

Categorize the issue into one of:
PAYMENT, LOGIN, BUG, OTHER

Also generate a professional reply.

Respond in JSON:
{
  "category": "",
  "reply": "",
  "confidence": 0.0
}

Issue: ${description}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices[0].message.content.trim();
    // Strip markdown code fences if present
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    return JSON.parse(text);
  } catch (error) {
    return {
      category: "OTHER",
      reply: "We will look into your issue shortly.",
      confidence: 0.5,
    };
  }
};