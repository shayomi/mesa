// models/report.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  userId: string;
  businessId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  type: "manual" | "scheduled";
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    userId: { type: String, required: true, index: true },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["manual", "scheduled"], default: "manual" },
  },
  { timestamps: true }
);

const Report =
  mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);

export default Report;
