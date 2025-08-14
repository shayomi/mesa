"use server";

import { revalidatePath } from "next/cache";
import Report, { IReport } from "../database/models/report.model";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import { DeleteReportParams } from "@/types";

// Save new report
export async function saveReport({
  userId,
  title,
  content,
}: {
  userId: string;
  title: string;
  content?: string;
}): Promise<IReport> {
  const newReport = new Report({
    userId,
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
