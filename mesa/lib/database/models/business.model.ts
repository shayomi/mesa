/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Schema, model, models } from "mongoose";
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
  region: { type: Array, required: true },
  painPoint: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  targetMarket: { type: Array, required: true },
});

const Business =
  mongoose.models.Business || mongoose.model("Business", BusinessSchema);

export default Business;
