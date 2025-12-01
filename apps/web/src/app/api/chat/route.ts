import { NextRequest, NextResponse } from "next/server";
import { retrieveTopK } from "../../lib/rag";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "mistralai/mistral-small-3.2-24b-instruct";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing 'message' in body" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not set" },
        { status: 500 }
      );
    }

    const topDocs = await retrieveTopK(message, 6);

    if (!topDocs.length) {
      return NextResponse.json({
        reply:
          "I couldn't find anything about this in the Apparatus Solutions knowledge file. I'm only allowed to answer from that file.",
        contextDocs: [],
      });
    }

    const MAX_CONTEXT_CHARS = 8000;
    let contextText = "";

    for (const d of topDocs) {
      const block = `Title: ${d.title}\nContent:\n${d.text}\n\n---\n\n`;
      if (contextText.length + block.length > MAX_CONTEXT_CHARS) break;
      contextText += block;
    }

    const messages = [
      {
  role: "system",
  content:
    "You are Vedrix AI, an expert assistant for Apparatus Solutions. " +
    "Use only the information provided in the RAG context. " +
    "When answering, you must ALWAYS respond in clean plain text only. " +
    "Do NOT use Markdown, bold, headings, symbols, bullet points, asterisks, or formatting of any kind. " +
    "Write in short, clear, natural sentences. " +
    "If the context does not contain the answer, say that the information is not available.",
},
      {
        role: "system",
        content: `Context documents:\n\n${contextText}`,
      },
      ...(Array.isArray(history)
        ? history.slice(-6).map((m: any) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          }))
        : []),
      {
        role: "user",
        content: message,
      },
    ];

    const resp = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Vedrix AI",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.4,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json(
        {
          error: "OpenRouter API error",
          status: resp.status,
          details: txt,
        },
        { status: 500 }
      );
    }

    const data = await resp.json();

    const reply =
      data?.choices?.[0]?.message?.content ??
      "I couldn't generate a response from the Apparatus Solutions knowledge file.";

    return NextResponse.json({ reply, contextDocs: topDocs });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}