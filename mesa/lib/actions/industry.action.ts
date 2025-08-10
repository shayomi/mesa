"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { CreateIndustryParams } from "@/types";
import Industry from "../database/models/industry.model";

export const createIndustry = async ({
  industryName,
}: CreateIndustryParams) => {
  try {
    await connectToDatabase();

    const newIndustry = await Industry.create({ name: industryName });

    return JSON.parse(JSON.stringify(newIndustry));
  } catch (error) {
    handleError(error);
  }
};

export const getAllIndustry = async () => {
  try {
    await connectToDatabase();

    const industries = await Industry.find();

    return JSON.parse(JSON.stringify(industries));
  } catch (error) {
    handleError(error);
  }
};
