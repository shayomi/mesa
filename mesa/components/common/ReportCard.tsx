// components/ReportCard.tsx
import {
  Download,
  FileText,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { saveAs } from "file-saver";

interface ReportCardProps {
  report: {
    _id: string;
    title: string;
    createdAt: string | Date;
    content: string;
    businessId: string;
  };
  showBusinessLink?: boolean;
}

export function ReportCard({
  report,
  showBusinessLink = false,
}: ReportCardProps) {
  const handleDownload = () => {
    const blob = new Blob([report.content], { type: "text/markdown" });
    saveAs(blob, `${report.title}.md`);
  };

  const createdAt = new Date(report.createdAt);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
              {report.title}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500 mt-2 space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                {createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
              <Clock className="h-4 w-4" />
              <span>
                {createdAt.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <FileText className="h-6 w-6 text-blue-500" />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-blue-600"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>

          <Button variant="outline" size="sm" className="gap-1" asChild>
            <Link href={`/dashboard/reports/${report._id}`}>
              View Details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {showBusinessLink && (
          <div className="mt-4 text-sm text-gray-500">
            <span>For: </span>
            <Link
              href={`/dashboard/business/${report.businessId}`}
              className="text-blue-600 hover:underline"
            >
              View Business
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
