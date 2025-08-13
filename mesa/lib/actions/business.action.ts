/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";

import User from "@/lib/database/models/user.model";

import { handleError } from "@/lib/utils";
import Industry from "../database/models/industry.model";
import {
  CreateBusinessParams,
  DeleteBusinessParams,
  GetAllBusinessParams,
  GetBusinessByUserParams,
  UpdateBusinessParams,
} from "@/types";
import Business from "@/lib/database/models/business.model";

const getIndustryByName = async (name: string) => {
  return Industry.findOne({ name: { $regex: name, $options: "i" } });
};

const populateBusiness = (query: any) => {
  return query
    .populate({
      path: "owner",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "industry", model: Industry, select: "_id name" });
};

// CREATE
export async function createBusiness({
  userId,
  business,
  path,
}: CreateBusinessParams) {
  try {
    await connectToDatabase();

    const owner = await User.findById(userId);
    if (!owner) throw new Error("Owner not found");

    const newBusiness = await Business.create({
      ...business,
      industry: business.industryId,
      owner: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newBusiness));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE business BY ID
export async function getBusinessById(businessId: string) {
  try {
    await connectToDatabase();

    const business = await populateBusiness(Business.findById(businessId));

    if (!business) throw new Error("business not found");

    return JSON.parse(JSON.stringify(business));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateBusiness({
  userId,
  business,
  path,
}: UpdateBusinessParams) {
  try {
    await connectToDatabase();

    const businessToUpdate = await Business.findById(business._id);
    if (!businessToUpdate || businessToUpdate.owner.toHexString() !== userId) {
      throw new Error("Unauthorized or business not found");
    }

    const updatedbusiness = await Business.findByIdAndUpdate(
      business._id,
      { ...business, category: business.industryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedbusiness));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteBusiness({
  businessId,
  path,
}: DeleteBusinessParams) {
  try {
    await connectToDatabase();

    const deletedBusiness = await Business.findByIdAndDelete(businessId);
    if (deletedBusiness) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL businessS
export async function getAllBusiness({
  query,
  limit = 6,
  page,
  industry,
}: GetAllBusinessParams) {
  try {
    await connectToDatabase();

    const businessNameCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const industryCondition = industry
      ? await getIndustryByName(industry)
      : null;
    const conditions = {
      $and: [
        businessNameCondition,
        industryCondition ? { industry: industryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const businesssQuery = Business.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const business = await populateBusiness(businesssQuery);
    const businessCount = await business.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(business)),
      totalPages: Math.ceil(businessCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET businessS BY ORGANIZER
export async function getBusinessByUser({
  userId,
  limit = 6,
  page,
}: GetBusinessByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { owner: userId };
    const skipAmount = (page - 1) * limit;

    const businesssQuery = Business.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const business = await populateBusiness(businesssQuery);
    const businessCount = await Business.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(business)),
      totalPages: Math.ceil(businessCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED businessS: businessS WITH SAME CATEGORY
