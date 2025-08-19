/* eslint-disable @typescript-eslint/no-unused-vars */

import { auth } from "@clerk/nextjs/server";
import { getBusinessByUser } from "@/lib/actions/business.action";
import { BusinessList } from "@/components/dashboard/BusinessList";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}

export async function EmptyState({
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  const { sessionClaims } = await auth();
  const userId = (sessionClaims as unknown as { userId: string })?.userId;
  const response = await getBusinessByUser({ userId, page: 1 });
  const businesses = response?.data ?? [];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4 items-start justify-between md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Businesses</h1>
          <p className="text-gray-500">Manage all your registered businesses</p>
        </div>
        <Button asChild>
          <Link href="dashboard/business/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Link>
        </Button>
      </div>

      <BusinessList businesses={businesses} showViewAll={false} />
    </div>
  );
}
