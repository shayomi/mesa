import { getMongoUserId } from "@/lib/actions/getMongoUserId";
import { connectToDatabase } from "@/lib/database";
import Business from "@/lib/database/models/business.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const clerkUserId = url.searchParams.get("userId"); // Pass Clerk ID from frontend
    if (!clerkUserId) return NextResponse.json([], { status: 400 });

    const mongoUserId = await getMongoUserId(clerkUserId);

    const businesses = await Business.find({ owner: mongoUserId }).select(
      "_id businessName"
    );

    return NextResponse.json(businesses);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
