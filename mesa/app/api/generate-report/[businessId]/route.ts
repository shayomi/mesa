/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/generate-report/[businessId]/route.ts
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import Business from "@/lib/database/models/business.model";
import { saveReport } from "@/lib/actions/report.action";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY! });

interface Params {
  businessId: string;
}

export async function POST(req: NextRequest, context: any) {
  console.log("Received request to generate report");

  try {
    const { userId } = await auth();
    console.log("Authenticated userId:", userId);
    if (!userId) {
      console.warn("Unauthorized access attempt");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("Connecting to database...");
    await connectToDatabase();
    console.log("Database connected");

    const { businessId } = (context as { params: Params }).params;
    console.log("Fetching business with ID:", businessId);

    const business = await Business.findById(businessId).populate(
      "industry owner"
    );
    if (!business) {
      console.warn("Business not found:", businessId);
      return new NextResponse("Business not found", { status: 404 });
    }
    console.log("Business found:", business.businessName);

    const prompt = `
Generate a comprehensive market expansion strategy report for the following company...
Company Name: ${business.businessName}
Industry: ${business.industry?.name}
Current Market: ${business.location}
Target Markets: ${business.targetMarket?.join(", ") || "N/A"}
Products/Services: ${business.description}
Business Goals: ${business.goals || "N/A"}
Challenges: ${business.painPoint || "N/A"}
    `;
    console.log("Prompt prepared for AI:", prompt);

    console.log("Calling OpenAI API...");
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
    });

    const content =
      aiResponse.choices[0].message?.content || "No content generated.";
    console.log("AI response received");

    const title = `Market Expansion Strategy for ${business.businessName}`;
    console.log("Saving report to database...");

    await saveReport({
      userId,
      businessId: business._id,
      title,
      content,
    });

    console.log("Report saved successfully");
    return NextResponse.json({ title, content });
  } catch (error) {
    console.error("Error generating report:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
