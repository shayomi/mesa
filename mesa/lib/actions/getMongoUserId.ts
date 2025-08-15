import User from "../database/models/user.model";

export async function getMongoUserId(clerkUserId: string) {
  const user = await User.findOne({ clerkId: clerkUserId }).select("_id");
  if (!user) {
    throw new Error("No corresponding Mongo user found");
  }
  return user._id;
}
