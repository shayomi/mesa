import { connectToDatabase } from "@/lib/database";
import Report from "@/lib/database/models/report.model";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export type ReportGenerationParams = {
  userId: string;
  businessName: string;
  industry: string;
  currentMarket?: string;
  targetMarkets: string;
  products?: string;
  goals?: string;
  challenges?: string;
};

export async function generateStrategyReport(
  params: ReportGenerationParams
): Promise<{
  id: string;
  title: string;
  createdAt: Date;
}> {
  try {
    await connectToDatabase();

    const prompt = `
Generate a comprehensive market expansion strategy report for ${
      params.businessName
    }. 
Each section must be detailed and written in a formal business tone.

Company Name: ${params.businessName}
Industry: ${params.industry || "N/A"}
Current Market: ${params.currentMarket || "N/A"}
Target Markets: ${params.targetMarkets || "N/A"}
Products/Services: ${params.products || "N/A"}
Business Goals: ${params.goals || "N/A"}
Challenges: ${params.challenges || "N/A"}

Structure the report with these sections:
1. Executive Summary
2. Market Analysis
3. Competitive Landscape
4. Target Market Segmentation
5. Entry Strategy
6. Marketing Plan
7. Risk Assessment
8. Financial Projections
9. Implementation Timeline
10. Key Performance Indicators
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content =
      response.choices[0]?.message?.content || "No content generated";

    const reportTitle = `Weekly Strategy Report - ${params.businessName} - ${
      new Date().toISOString().split("T")[0]
    }`;

    const newReport = await Report.create({
      userId: params.userId,
      title: reportTitle,
      content,
      type: "scheduled",
      createdAt: new Date(),
    });

    return {
      id: newReport._id.toString(),
      title: reportTitle,
      createdAt: newReport.createdAt,
    };
  } catch (error) {
    console.error("Error generating strategy report:", error);
    throw new Error("Failed to generate strategy report");
  }
}
