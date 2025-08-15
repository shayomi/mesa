// app/api/generate-report/[businessId]/route.ts
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import Business from "@/lib/database/models/business.model";
import { saveReport } from "@/lib/actions/report.action";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY! });

export async function POST(
  req: Request,
  { params }: { params: { businessId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDatabase();

    // Await the params object before destructuring

    const business = await Business.findById(
      (
        await params
      ).businessId
    ).populate("industry owner");
    if (!business)
      return new NextResponse("Business not found", { status: 404 });

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

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const content =
      aiResponse.choices[0].message.content || "No content generated.";
    const title = `Market Expansion Strategy for ${business.businessName}`;

    await saveReport({
      userId,
      businessId: business._id,
      title,
      content,
    });

    return new NextResponse(JSON.stringify({ title, content }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
