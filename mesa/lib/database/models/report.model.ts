/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IReport extends Document {
  userId: string;
  title: string;
  createdAt: Date;
  content?: string; // full report (optional)
}

const ReportSchema = new Schema<IReport>({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  content: { type: String },
});

// Prevent model overwrite issue in Next.js hot reloads
const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default Report;
