"use server";

import { revalidatePath } from "next/cache";
import Report, { IReport } from "../database/models/report.model";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import { DeleteReportParams } from "@/types";

// Save new report
export async function saveReport({
  userId,
  businessId, // ← add this
  title,
  content,
}: {
  userId: string;
  businessId?: string; // optional if some reports aren’t tied to a business
  title: string;
  content?: string;
}): Promise<IReport> {
  const newReport = new Report({
    userId,
    business: businessId, // ← link report to business
    title,
    content,
    createdAt: new Date(),
  });

  return newReport.save();
}

// Fetch all reports by userId
export async function getReportsByUser(userId: string): Promise<IReport[]> {
  return Report.find({ userId }).sort({ createdAt: -1 }).exec();
}

export async function deleteReport({ reportId, path }: DeleteReportParams) {
  try {
    await connectToDatabase();

    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (deletedReport) {
      revalidatePath(path);
    } else {
      console.warn(`No report found with id: ${reportId}`);
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getReportsByBusinessId(businessId: string) {
  const reports = await Report.find({ business: businessId })
    .sort({ createdAt: -1 })
    .limit(5);
  return reports.map((r) => ({
    id: r._id.toString(),
    title: r.title,
    createdAt: r.createdAt,
    url: r.url, // or any download link
  }));
}
