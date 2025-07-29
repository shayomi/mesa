import { Document, Schema, model, models } from "mongoose";

export interface IIndustry extends Document {
  _id: string;
  name: string;
}

const IndustrySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Industry = models.Industry || model("Industry", IndustrySchema);

export default Industry;
