"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Business {
  _id: string;
  businessName: string;
}

export function GenerateReportDropdown() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loadingBusinessId, setLoadingBusinessId] = useState<string | null>(
    null
  );
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    fetch(`/api/my-businesses?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setBusinesses(data))
      .catch(console.error);
  }, [user]);

  const handleSelectBusiness = async (businessId: string) => {
    try {
      setLoadingBusinessId(businessId);

      const res = await fetch(`/api/generate-report/${businessId}`, {
        method: "POST",
      });

      if (!res.ok) {
        console.error("Failed to generate report");
        setLoadingBusinessId(null);
        return;
      }

      const report = await res.json();
      console.log("Generated Report:", report);

      // Redirect to business detail page
      window.location.href = `/dashboard/business/${businessId}`;
    } catch (err) {
      console.error("Error generating report:", err);
      setLoadingBusinessId(null);
    }
  };

  const isLoading = loadingBusinessId !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="h-6 w-6" />
              Generate Report
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {businesses.length === 0 ? (
          <DropdownMenuItem disabled>No businesses found</DropdownMenuItem>
        ) : (
          businesses.map((b) => (
            <DropdownMenuItem
              key={b._id}
              onClick={() => handleSelectBusiness(b._id)}
              disabled={loadingBusinessId === b._id}
            >
              {loadingBusinessId === b._id ? "Generating..." : b.businessName}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
