import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

  const prompt = `
Generate a detailed market expansion strategy for the following company:

Company Name: ${companyName}
Industry: ${industry}
Current Market: ${currentMarket}
Target Markets: ${targetMarkets}
Products/Services: ${products}
Business Goals: ${goals || "N/A"}
Challenges: ${challenges || "N/A"}

Include:
1. Market Overview
2. Competitive Landscape
3. Entry Strategies
4. Marketing Plan
5. Operational Considerations
6. Financial Implications
7. Key Recommendations
8. PESTLE Analysis
9. MACS Index
10. SWOT Analysis
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  const content =
    response.choices[0].message.content || "No content generated.";

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
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=Market-Expansion-Strategy.pdf",
    },
  });
}
