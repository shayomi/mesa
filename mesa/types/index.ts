// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== EVENT PARAMS
export type CreateBusinessParams = {
  userId: string;
  business: {
    businessName: string;
    description?: string;
    location?: string;
    imageUrl: string;
    industryId: string;
    targetAudience?: string;
    goals: string;
    companySize: string;
    region: string[];
    painPoint?: string;
    targetMarket: string[];
  };
  path: string;
};

export type UpdateBusinessParams = {
  userId: string;
  business: {
    _id: string;
    businessName: string;
    description?: string;
    location?: string;
    imageUrl: string;
    industryId: string;
    targetAudience?: string;
    goals: string;
    companySize: string;
    region: string[];
    painPoint?: string;
    targetMarket: string[];
  };
  path: string;
};

export type DeleteBusinessParams = {
  businessId: string;
  path: string;
};

export type GetAllBusinessParams = {
  query: string;
  industry: string;
  limit: number;
  page: number;
};

export type GetBusinessByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type Business = {
  _id: string;
  businessName: string;
  description?: string;
  location?: string;
  imageUrl: string;
  createdAt: Date;
  goals: string;
  companySize: string;
  region: string[];
  painPoint?: string;
  targetAudience?: string;
  targetMarket: string[];
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  industry: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateIndustryParams = {
  industryName: string;
};

// ====== ORDER PARAMS

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
