// lib/actions/report.action.ts
import { connectToDatabase } from "@/lib/database";
import Report, { IReport } from "../database/models/report.model";

// Save new report
export async function saveReport({
  userId,
  businessId,
  title,
  content,
}: {
  userId: string;
  businessId: string;
  title: string;
  content: string;
}): Promise<IReport> {
  await connectToDatabase();

  const newReport = new Report({
    userId,
    businessId,
    title,
    content,
    type: "manual",
  });

  return newReport.save();
}

// Fetch all reports by businessId
export async function getReportsByBusiness(
  businessId: string
): Promise<IReport[]> {
  await connectToDatabase();
  return Report.find({ businessId })
    .sort({ createdAt: -1 })
    .lean<IReport[]>()
    .exec();
}

// Fetch all reports by userId
export async function getReportsByUser(userId: string): Promise<IReport[]> {
  await connectToDatabase();
  return Report.find({ userId })
    .sort({ createdAt: -1 })
    .lean<IReport[]>()
    .exec();
}

// Fetch single report by ID
export async function getReportById(reportId: string): Promise<IReport | null> {
  await connectToDatabase();
  return Report.findById(reportId).lean<IReport>().exec();
}
