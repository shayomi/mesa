// components/GenerateReportForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function GenerateReportForm({
  business,
  onSuccess,
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
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goals: business.goals || "",
    challenges: business.painPoint || "",
    additionalInfo: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Create a toast promise to show loading state
    toast.promise(
      (async () => {
        try {
          const response = await fetch("/api/generate-strategy-report", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              businessId: business._id,
              companyName: business.businessName,
              industry:
                typeof business.industry === "string"
                  ? business.industry
                  : business.industry?.name || "",
              currentMarket: business.currentMarket || "",
              targetMarkets: business.targetMarket?.join(", ") || "",
              products: business.products || "",
              goals: formData.goals,
              challenges: formData.challenges,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to generate report");
          }

          const data = await response.json();

          if (onSuccess) onSuccess();
          router.refresh();

          return data.title;
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      })(),
      {
        loading: "Generating report...",
        success: (title) => `Report "${title}" generated successfully!`,
        error: "Failed to generate report",
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goals">Business Goals</Label>
        <Textarea
          id="goals"
          value={formData.goals}
          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
          placeholder="Describe your business goals for expansion"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">Challenges</Label>
        <Textarea
          id="challenges"
          value={formData.challenges}
          onChange={(e) =>
            setFormData({ ...formData, challenges: e.target.value })
          }
          placeholder="Describe any challenges you're facing"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) =>
            setFormData({ ...formData, additionalInfo: e.target.value })
          }
          placeholder="Any other information that might help in the analysis"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Report"}
        </Button>
      </div>
    </form>
  );
}
