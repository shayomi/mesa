/* eslint-disable @typescript-eslint/no-unused-vars */
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { UserBusinessCard } from "../common/UserBusinessCard";
import { EmptyState } from "./EmptyState";

interface Business {
  _id: string;
  businessName: string;
  description?: string;
  location?: string;
  imageUrl: string;
  industry?: { name: string } | string;
  companySize?: string;
  createdAt?: string;
}

interface BusinessListProps {
  businesses: Business[];
  showViewAll?: boolean;
}

export function BusinessList({
  businesses,
  showViewAll = true,
}: BusinessListProps) {
  return (
    <div className="">
      <div className="border-none">
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-none gap-4 items-stretch">
            {businesses.map((business) => (
              <UserBusinessCard
                key={business._id}
                business={{
                  ...business,
                  description: business.description || "",
                  location: business.location || "",
                  industry:
                    typeof business.industry === "string"
                      ? business.industry
                      : business.industry?.name || "",
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No businesses yet"
            description="Get started by adding your first business"
            actionText="Add Business"
            actionHref="/business/new"
          />
        )}
      </div>
      {businesses.length > 0 && showViewAll && (
        <CardFooter className="border-t pt-4">
          <Button variant="ghost" className="text-primary" asChild>
            <Link href="/business">
              View all businesses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
