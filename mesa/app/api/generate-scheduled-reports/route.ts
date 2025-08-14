// app/api/generate-scheduled-reports/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateStrategyReport } from "@/lib/reports";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await generateStrategyReport(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate scheduled report" },
      { status: 500 }
    );
  }
}
