/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChartBig,
  Building2,
  MapPinned,
  LineChart,
  FileText,
  UploadCloud,
  Plus,
  ArrowRight,
  Activity,
  UserPlus,
  Database,
  Combine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { getBusinessByUser } from "@/lib/actions/business.action";
import { UserBusinessCard } from "../common/UserBusinessCard";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { GenerateReportDropdown } from "./GenerateReportDropdown";
import { getReportsByBusinessId } from "@/lib/actions/report.action";
interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function DashboardSection({ id }: { id: string }) {
  const { sessionClaims } = await auth();
  const userId = (sessionClaims as unknown as { userId: string })?.userId;
  const response = await getBusinessByUser({ userId, page: 1 });
  const businesses = response?.data ?? [];

  const reports = await getReportsByBusinessId(id);

  return (
    <section className="p-0">
      <div className="flex flex-col md:flex-row gap-3 items-start justify-between md:items-center mb-8">
        <div>
          <Typography variant="h2" className="font-bold text-gray-900">
            Dashboard Overview
          </Typography>
          <Typography variant="lead" className="text-gray-500">
            Your business insights at a glance
          </Typography>
        </div>
        <Button asChild>
          <Link href="/dashboard/business/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Link>
        </Button>
      </div>
      {/* Businesses Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-700" />
              Your Businesses
            </CardTitle>
            <CardDescription>
              {businesses.length} registered businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {businesses.length > 0 ? (
              <div className="flex flex-col md:flex-row flex-wrap items-start gap-4">
                {businesses.map((business: any) => (
                  <UserBusinessCard key={business._id} business={business} />
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
          </CardContent>
          {businesses.length > 0 && (
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/dashboard/business-list">
                  View all businesses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
        {/* Quick Actions */}
        <div className="flex flex-col">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <GenerateReportDropdown />
              <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                <Link href="/dashboard/business/create">
                  <UploadCloud className="h-6 w-6" />
                  Add Business
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm mt-4">
            <CardHeader>
              <CardTitle>Most Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {reports.length === 0 ? (
                <p className="p-4 text-muted-foreground">
                  No recent reports for now
                </p>
              ) : (
                reports
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .slice(0, 3)
                  .map((report: any) => (
                    <div
                      key={report.id}
                      className="p-4 flex flex-col md:flex-row gap-4 items-start justify-between lg:items-end hover:bg-gray-50 border-t first:border-t-0"
                    >
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0">
                        <Link href={`/dashboard/reports/${report.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Button variant="default" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
        {/* Left Column - Stats & Businesses */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            <StatCard
              title="Market Strategies"
              value="Growth and Revenue"
              description="Explore different market strategies by various models"
              icon={<BarChartBig className="text-blue-500" />}
              color="bg-blue-50"
            />
            <StatCard
              title="Growth Index"
              value="Considers all major growth indicators"
              description="KPI's and other models to help with growth"
              icon={<Building2 className="text-purple-500" />}
              color="bg-purple-50"
            />
            <StatCard
              title="Regions"
              value="Worldwide"
              description="Strategies factor policeis all over the world"
              icon={<MapPinned className="text-green-500" />}
              color="bg-green-50"
            />
            <StatCard
              title="Industries"
              value="All Sectors"
              description="Strategies for growth across all major industries"
              icon={<LineChart className="text-pink-500" />}
              color="bg-pink-50"
            />
          </div>
        </div>

        {/* Right Column - Actions & Upgrade */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upgrade Card */}
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-0 text-white">
            <CardHeader>
              <CardTitle className="text-white">Unlock Pro Features</CardTitle>
              <CardDescription className="text-indigo-100">
                Advanced analytics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-indigo-100">
                <li className="flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Real-time market monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4" /> Unlimited report generation
                </li>
                <li className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Team collaboration
                </li>
                <li className="flex items-center gap-2 text-red-200">
                  <Combine className="h-4 w-4" /> Coming soon
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white cursor-not-allowed text-indigo-600 hover:bg-gray-100">
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Activity */}
        </div>

        {/* Bottom Section - Charts */}
        <div className="lg:col-span-12">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Report Trends</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChartBig className="mx-auto h-12 w-12" />
                  <p>Report analytics coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Reusable Components
const StatCard = ({
  title,
  value,
  description,
  icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card className={`border-0 ${color} shadow-sm`}>
    <CardHeader className="flex flex-row items-center justify-between p-4">
      <CardTitle className="text-sm font-medium text-gray-700">
        {title}
      </CardTitle>
      <div className="p-2 rounded-full bg-white">{icon}</div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const EmptyState = ({
  title,
  description,
  actionText,
  actionHref,
}: {
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
    <Building2 className="h-10 w-10 text-gray-400 mb-3" />
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>
    <Button asChild>
      <Link href={actionHref}>{actionText}</Link>
    </Button>
  </div>
);
