/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  FileText,
  Share2,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DeleteConfirmation } from "@/components/dashboard/DeleteReport";

// Types
type Report = {
  _id: string;
  title: string;
  content?: string;
  createdAt: string;
  type?: "manual" | "scheduled";
};

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState("");

  async function fetchReport() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/my-reports", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch reports (${res.status})`);
      const data: Report[] = await res.json();
      const found = data.find(
        (r) => (r as any)._id === id || (r as any).id === id
      );
      if (!found) throw new Error("Report not found");
      // normalize _id (API might return id)
      const normalized: Report = {
        _id: (found as any)._id || (found as any).id,
        title: found.title,
        content: found.content,
        createdAt: found.createdAt,
        type: found.type,
      };
      setReport(normalized);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const stats = useMemo(() => {
    const text = report?.content || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const readingMinutes = Math.max(1, Math.round(words / 225));
    return { words, chars, readingMinutes };
  }, [report?.content]);

  function downloadMarkdown() {
    if (!report?.content) return;
    const blob = new Blob([report.content], {
      type: "text/markdown;charset=utf-8",
    });
    const filename = `${report.title
      .replace(/[^a-z0-9\-\s]/gi, "")
      .replace(/\s+/g, "-")}.md`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename || "report.md";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function copyLink() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
    } catch {}
  }

  const createdDate = report?.createdAt ? new Date(report.createdAt) : null;

  return (
    <div className="mx-auto  ">
      {/* Top Bar */}
      <div className="mb-6 md:px-2 flex items-center gap-2">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 rounded-t-2xl py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                  {report?.title || (loading ? "Loading…" : "Report")}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Report
                  </span>
                  {createdDate && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" />{" "}
                      {createdDate.toLocaleDateString()}
                    </span>
                  )}
                  {createdDate && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />{" "}
                      {createdDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                  {report?.type && (
                    <Badge variant="secondary" className="rounded-full">
                      {report.type}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={fetchReport}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}{" "}
                  Refresh
                </Button>
                <Button variant="outline" className="gap-2" onClick={copyLink}>
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button className="gap-2" onClick={downloadMarkdown}>
                  <Download className="h-4 w-4" /> Download .md
                </Button>
                {report?._id && (
                  <Button variant="outline" className="gap-2" asChild>
                    <span>
                      <DeleteConfirmation reportId={report._id} />
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          {/* Quick Stats */}
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-6">
            <Stat title="Reading time" value={`${stats.readingMinutes} min`} />
            <Stat title="Words" value={stats.words.toLocaleString()} />
            <Stat title="Characters" value={stats.chars.toLocaleString()} />
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Content + Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-8"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Report Content</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-6 w-2/3 bg-gray-100 rounded" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-5/6 bg-gray-100 rounded" />
                  <div className="h-4 w-4/6 bg-gray-100 rounded" />
                </div>
              ) : error ? (
                <ErrorState message={error} onRetry={fetchReport} />
              ) : (
                <article className="prose prose-slate max-w-none prose-headings:scroll-mt-28 gap-3">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {report?.content || "_No content_"}
                  </ReactMarkdown>
                </article>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Utilities */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-4 space-y-6"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Quick Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Find in report…"
                className=""
              />
              {filter && (
                <p className="text-xs text-gray-500 mt-2">
                  Showing matches for “{filter}”. Use your browser search
                  (Ctrl/Cmd+F) for full-text jump.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">About this report</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Created:</strong>{" "}
                {createdDate ? createdDate.toLocaleString() : "—"}
              </p>
              <p>
                <strong>Type:</strong> {report?.type || "manual"}
              </p>
              <p>
                <strong>ID:</strong> {report?._id || "—"}
              </p>
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-xs tracking-wide text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 rounded-full bg-red-50 p-3 text-red-600">
        <Trash2 className="h-5 w-5" />
      </div>
      <p className="text-sm text-red-700">{message}</p>
      <Button variant="outline" className="mt-4 gap-2" onClick={onRetry}>
        <RefreshCw className="h-4 w-4" /> Retry
      </Button>
    </div>
  );
}
