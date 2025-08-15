/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBusinessById } from "@/lib/actions/business.action";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Users,
  Target,
  Goal,
  AlertCircle,
  Globe,
  BarChart,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getReportsByBusinessId } from "@/lib/actions/report.action";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BusinessDetailPage({ params }: PageProps) {
  const business = await getBusinessById((await params).id); // ✅ no `await params`
  const reports = await getReportsByBusinessId((await params).id);

  if (!business) return notFound();

  return (
    <div className="p-6 space-y-6">
      {/* Header / Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-lg overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={business.imageUrl}
              alt={business.businessName}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                {business.businessName}
              </h1>
              <Badge variant="secondary" className="text-sm">
                {business.companySize}
              </Badge>
            </div>
            <p className="text-blue-100 mt-2 max-w-2xl">
              {business.description}
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{business.location}</span>
              </div>
              {business.industry?.name && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{business.industry.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/business/${business._id}/edit`}>
              Edit Profile
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/reports/generate?businessId=${business._id}`}>
              Generate Report
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-200"
            asChild
          >
            <Link href={`/dashboard/business/${business._id}/analytics`}>
              View Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Report Frequency"
          value={
            business.reportFrequency === "none"
              ? "Manual"
              : business.reportFrequency === "weekly"
              ? "Weekly"
              : "Monthly"
          }
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          title="Target Markets"
          value={business.targetMarket?.length || 0}
          icon={<Target className="h-5 w-5" />}
        />
        <StatCard
          title="Regions"
          value={business.region?.length || 0}
          icon={<Globe className="h-5 w-5" />}
        />
        <StatCard
          title="Reports"
          value="12"
          icon={<BarChart className="h-5 w-5" />}
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <DetailCard
            title="Target Audience"
            value={business.targetAudience}
            icon={<Users className="h-5 w-5 text-blue-500" />}
          />
          <DetailCard
            title="Business Goals"
            value={business.goals}
            icon={<Goal className="h-5 w-5 text-green-500" />}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DetailCard
            title="Pain Points"
            value={business.painPoint}
            icon={<AlertCircle className="h-5 w-5 text-red-500" />}
          />
          <DetailCard
            title="Market Details"
            value={
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Target Regions
                  </p>
                  <p>{business.region?.join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Target Markets
                  </p>
                  <p>{business.targetMarket?.join(", ") || "—"}</p>
                </div>
              </div>
            }
            icon={<Target className="h-5 w-5 text-purple-500" />}
          />
        </div>
      </div>

      {/* Recent Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg divide-y">
            {reports.length === 0 ? (
              <p className="p-4 text-muted-foreground">No reports yet</p>
            ) : (
              reports.map((report: any) => (
                <div
                  key={report.id}
                  className="p-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/reports/${report.id}`}>
                      {" "}
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="ghost" className="text-blue-600" asChild>
            <Link href={`/dashboard/business/${business._id}/reports`}>
              View all reports <span className="ml-1">→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">{icon}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function DetailCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3 p-6 pb-0">
        {icon && (
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">{icon}</div>
        )}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-3">
        <div className="text-gray-700">
          {typeof value === "string" ? (
            <p className={value === "—" ? "text-muted-foreground" : ""}>
              {value}
            </p>
          ) : (
            value
          )}
        </div>
      </CardContent>
    </Card>
  );
}
