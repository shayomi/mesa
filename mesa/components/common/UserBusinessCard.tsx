// components/UserBusinessCard.tsx
import Image from "next/image";
import { Card, CardTitle } from "../ui/card";
import Link from "next/link";

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
    <Link href={`/dashboard/business/${business._id}`}>
      <Card className="flex flex-col md:flex-row gap-4 p-4 items-center border-red-100">
        <Image
          src={business.imageUrl}
          alt={business.businessName}
          width={120}
          height={120}
          className="rounded-md object-cover"
        />
        <div className="text-center md:text-left space-y-1">
          <CardTitle className="text-xl font-bold text-blue-700">
            {business.businessName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {business.description}
          </p>
          <p className="text-sm">
            <strong>Location:</strong> {business.location}
          </p>
          <p className="text-sm">
            <strong>Company Size:</strong> {business.companySize || "N/A"}
          </p>
          {/* <p className="text-sm">
          <strong>Industry:</strong> {business.industry || "N/A"}
        </p> */}
        </div>
      </Card>
    </Link>
  );
};
