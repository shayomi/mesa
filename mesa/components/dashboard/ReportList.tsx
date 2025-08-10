"use client";

import { useEffect, useState } from "react";

type Report = {
  id: string;
  title: string;
  createdAt: string;
};

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const res = await fetch("/api/my-reports");
      const data = await res.json();
      setReports(data);
    }
    fetchReports();
  }, []);

  return (
    <div className="space-y-4">
      {reports.map(({ id, title, createdAt }) => (
        <div
          key={id}
          className="bg-white shadow rounded-md p-4 border border-gray-200"
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">
            Generated on:{" "}
            {new Date(createdAt).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
