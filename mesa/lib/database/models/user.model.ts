/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
