// app/dashboard/reports/[id]/page.tsx
import { getReportById } from "@/lib/actions/report.action";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import { MarkdownRenderer } from "./MarkdownRenderer";

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const report = await getReportById(params.id);
  if (!report) return notFound();

  const handleDownload = () => {
    const blob = new Blob([report.content], { type: "text/markdown" });
    saveAs(blob, `${report.title}.md`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{report.title}</h1>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <MarkdownRenderer content={report.content} />
      </div>
    </div>
  );
}
