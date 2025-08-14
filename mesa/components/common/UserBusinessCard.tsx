// components/UserBusinessCard.tsx
import Image from "next/image";
import { Card, CardTitle } from "../ui/card";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "../ui/button";

type BusinessCardProps = {
  business: {
    _id: string;
    businessName: string;
    description: string;
    location: string;
    imageUrl: string;
    industry?: string;
    companySize?: string;
    createdAt?: string;
  };
};

export const UserBusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card className="flex flex-col  gap-4  pt-0 pb-4  border-red-100 h-full">
      <Image
        src={business.imageUrl}
        alt={business.businessName}
        width={120}
        height={60}
        className="rounded-md object-cover w-full h-[150px]"
      />
      <div className="text-left space-y-1 px-6">
        <div className="flex flex-row gap-2 justify-between">
          <CardTitle className="text-xl font-bold text-[#072a81]">
            {business.businessName}
          </CardTitle>
          <div className="flex flex-row items-center gap-2">
            <Link href={`/dashboard/business/${business._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
            <DeleteConfirmation businessId={business._id} />
          </div>
        </div>

        <p className="text-sm text-muted-for0/eground">
          {business.description}
        </p>
        <p className="text-sm">
          <strong>Location:</strong> {business.location}
        </p>
        <p className="text-sm">
          <strong>Company Size:</strong> {business.companySize || "N/A"}
        </p>
        <div className="mt-6">
          <Link
            className="h-full mt-6"
            href={`/dashboard/business/${business._id}`}
          >
            <Button variant="default" className="bg-blue-200 text-blue-800">
              View details
            </Button>{" "}
          </Link>
        </div>
      </div>
    </Card>
  );
};
