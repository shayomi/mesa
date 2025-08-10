// app/dashboard/business/[id]/page.tsx
import { getBusinessById } from "@/lib/actions/business.action";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BusinessDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function BusinessDetailPage({
  params,
}: BusinessDetailPageProps) {
  const business = await getBusinessById(params.id);

  if (!business) return notFound();

  return (
    <div className="p-6 space-y-6">
      {/* Header / Hero Card */}
      <Card className="flex flex-col md:flex-row gap-6 items-center">
        <Image
          src={business.imageUrl}
          alt={business.businessName}
          width={200}
          height={200}
          className="rounded-lg object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            {business.businessName}
          </h1>
          <p className="text-gray-600 mt-1">{business.description}</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <p>
              <strong>Location:</strong> {business.location}
            </p>
            <p>
              <strong>Company Size:</strong> {business.companySize}
            </p>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DetailCard title="Industry" value={business.industry?.name || "N/A"} />
        <DetailCard
          title="Region(s)"
          value={business.region?.join(", ") || "N/A"}
        />
        <DetailCard
          title="Target Market"
          value={business.targetMarket?.join(", ") || "N/A"}
        />
        <DetailCard title="Target Audience" value={business.targetAudience} />
        <DetailCard title="Goals" value={business.goals} />
        <DetailCard title="Pain Points" value={business.painPoint} />
      </div>
    </div>
  );
}

function DetailCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{value || "—"}</p>
      </CardContent>
    </Card>
  );
}
