/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call your report generation endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/generate-scheduled-reports`
    );
    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
