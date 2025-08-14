"use client";

import { useEffect, useState } from "react";
import {
  Download,
  FileText,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { saveAs } from "file-saver";
import { DeleteConfirmation } from "./DeleteReport";
import Link from "next/link";

type Report = {
  _id: string;
  title: string;
  createdAt: string;
  content?: string;
};

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/my-reports");
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const handleDownload = (report: Report) => {
    if (!report.content) return;

    const blob = new Blob([report.content], { type: "text/markdown" });
    saveAs(blob, `${report.title}.md`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="border border-gray-100 rounded-lg overflow-hidden"
          >
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <FileText className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No reports yet</h3>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Your generated reports will appear here
        </p>
        <Button>Generate First Report</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <Card
          key={report._id}
          className="hover:shadow-lg transition-all duration-200 border border-gray-100 rounded-xl overflow-hidden"
        >
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                  {report.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(report.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-blue-600"
                onClick={() => handleDownload(report)}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>

              <Button variant="outline">
                <DeleteConfirmation reportId={report._id} />
              </Button>
            </div>
            <Link href={`/dashboard/reports/${report._id}`}>
              <Button variant="outline" size="sm" className="gap-1 mt-4">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
