import { Document, Schema, model, models } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose from "mongoose";

export interface IBusiness extends Document {
  _id: string;
  businessName: string;
  description: string;
  location: string;
  createdAt: Date;
  imageUrl: string;
  industry: { _id: string; name: string };
  targetAudience: string;
  goals: string;
  companySize: string;
  region: string[];
  painPoint: string;
  owner: { _id: string; firstName: string; lastName: string };
  targetMarket: string[];
  lastReportGenerated?: Date;
  reportFrequency: "weekly" | "monthly" | "none";
}

const BusinessSchema = new Schema({
  businessName: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  industry: { type: Schema.Types.ObjectId, ref: "Industry" },
  targetAudience: { type: String, required: true },
  goals: { type: String, required: true },
  companySize: { type: String, required: true },
  region: { type: [String], required: true },
  painPoint: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targetMarket: { type: [String], required: true },
  lastReportGenerated: { type: Date },
  reportFrequency: {
    type: String,
    enum: ["weekly", "monthly", "none"],
    default: "none",
  },
});

const Business =
  models.Business || model<IBusiness>("Business", BusinessSchema);

export default Business;
