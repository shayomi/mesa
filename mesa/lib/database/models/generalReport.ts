import mongoose, { Schema, Document } from "mongoose";

export interface IGeneralReport extends Document {
  userId: string;
  title: string;
  content: string;
  type: "manual" | "scheduled";
  createdAt: Date;
  updatedAt: Date;
}

const GeneralReportSchema = new Schema<IGeneralReport>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["manual", "scheduled"], default: "manual" },
  },
  { timestamps: true }
);

// ✅ make sure model name is "GeneralReport" not "Report"
const GeneralReport =
  mongoose.models.GeneralReport ||
  mongoose.model<IGeneralReport>("GeneralReport", GeneralReportSchema);

export default GeneralReport;
