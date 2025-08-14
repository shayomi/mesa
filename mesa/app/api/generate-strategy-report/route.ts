import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import { saveReport } from "@/lib/actions/report.action";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    companyName,
    industry,
    currentMarket,
    targetMarkets,
    products,
    goals,
    challenges,
  } = body;

  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  await connectToDatabase();

  const prompt = `
Generate a comprehensive market expansion strategy report for the following company. Each section must be at least 500 words and written in a formal business tone.

Company Name: ${companyName}
Industry: ${industry}
Current Market: ${currentMarket}
Target Markets: ${targetMarkets}
Products/Services: ${products}
Business Goals: ${goals || "N/A"}
Challenges: ${challenges || "N/A"}

Structure the report with the following sections (each clearly labeled and detailed):
1. Market Overview
2. Competitive Landscape
3. Entry Strategies
4. Marketing Plan
5. Operational Considerations
6. Financial Implications
7. Key Recommendations
8. PESTLE Analysis
9. MACS Index
10. Market Attractiveness Evaluation
11. Competitive Strength Evaluation
12. SWOT Analysis

Respond in Markdown-like format with clear headings and spacing.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [{ role: "user", content: prompt }],
  });

  const content =
    response.choices[0].message.content || "No content generated.";

  const reportTitle = `Market Expansion Strategy for ${companyName}`;
  const createdAt = new Date().toISOString();

  // Save to DB
  await saveReport({ userId, title: reportTitle, content });

  return NextResponse.json({
    title: reportTitle,
    createdAt,
    content,
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: content.split("\n\n").map(
          (text) =>
            new Paragraph({
              children: [new TextRun(text)],
            })
        ),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/docx",
      "Content-Disposition":
        "attachment; filename=Market-Expansion-Strategy.docx",
    },
  });
}
