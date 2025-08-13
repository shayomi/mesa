// components/GenerateReportButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GenerateReportForm } from "./GenerateReportForm";

export function GenerateReportButton({
  business,
}: {
  business: {
    _id: string;
    businessName: string;
    industry?: { name: string } | string;
    currentMarket?: string;
    targetMarket?: string[];
    products?: string;
    goals?: string;
    painPoint?: string;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Generate Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate Market Expansion Report</DialogTitle>
        </DialogHeader>
        <GenerateReportForm
          business={business}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
