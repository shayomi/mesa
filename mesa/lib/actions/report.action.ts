import Report, { IReport } from "../database/models/report.model";

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
