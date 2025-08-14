// app/api/my-reports/route.ts
import { NextResponse } from "next/server";

import { getReportsByUser } from "@/lib/actions/report.action";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectToDatabase();

  const reports = await getReportsByUser(userId);

  return NextResponse.json(
    reports.map(({ _id, title, content, createdAt }) => ({
      _id: _id,
      title,
      content,
      createdAt,
    }))
  );
}
