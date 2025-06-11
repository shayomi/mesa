import {
  BarChartBig,
  Building2,
  MapPinned,
  LineChart,
  Users,
  FileText,
  UploadCloud,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardSection() {
  return (
    <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      {/* Summary Cards */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Market Strategies</CardTitle>
            <BarChartBig className="text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">38 Reports</p>
            <p className="text-sm text-muted-foreground">in last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Company Size</CardTitle>
            <Building2 className="text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">45 SMEs</p>
            <p className="text-sm text-muted-foreground">+12 Enterprises</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Regions</CardTitle>
            <MapPinned className="text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12 Countries</p>
            <p className="text-sm text-muted-foreground">NA, EU, Asia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Industries</CardTitle>
            <LineChart className="text-pink-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8 Sectors</p>
            <p className="text-sm text-muted-foreground">
              Tech, Retail, Finance...
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Action Panel */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
          <CardContent className="p-5">
            <h3 className="text-xl font-semibold mb-1">Upgrade to Pro</h3>
            <p className="text-sm mb-4">
              Unlock advanced insights, team analytics, and AI recommendations.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-indigo-700 hover:bg-gray-100"
            >
              Upgrade Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Quick Actions</CardTitle>
            <Plus className="text-gray-500" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex gap-2">
              <FileText size={16} /> Generate Report
            </Button>
            <Button variant="outline" className="flex gap-2">
              <UploadCloud size={16} /> Upload Data
            </Button>
            <Button
              variant="outline"
              className="col-span-2 flex justify-center gap-2"
            >
              <Users size={16} /> Invite Team
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Chart */}
      <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Generated report for Tech Expansion</span>
              <span className="text-muted-foreground">2h ago</span>
            </div>
            <div className="flex justify-between">
              <span>Uploaded SME dataset</span>
              <span className="text-muted-foreground">Yesterday</span>
            </div>
            <div className="flex justify-between">
              <span>Invited Sarah from SalesOps</span>
              <span className="text-muted-foreground">2 days ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
              {/* Replace this with chart component */}
              <span>📊 Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
