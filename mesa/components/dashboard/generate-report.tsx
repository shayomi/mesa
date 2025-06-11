"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BusinessForm() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setOpen(true);

    const res = await fetch("/api/generate-strategy-report", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Market-Expansion-Strategy.docx";
    a.click();

    setOpen(false);
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-start">
          <h1 className="text-4xl font-bold text-gray-900">
            Market Expansion Strategy Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in your business details and we’ll generate a tailored market
            expansion strategy report.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Input name="companyName" placeholder="e.g. Acme Inc." required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <Input name="industry" placeholder="e.g. Fintech" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Market
              </label>
              <Input
                name="currentMarket"
                placeholder="e.g. United States"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Markets
              </label>
              <Input
                name="targetMarkets"
                placeholder="e.g. UK, Canada, Germany"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Products / Services
            </label>
            <Textarea
              name="products"
              placeholder="Describe what your company offers..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Goals
              </label>
              <Textarea
                name="goals"
                placeholder="e.g. Increase market share, launch new product"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Challenges
              </label>
              <Textarea
                name="challenges"
                placeholder="e.g. High competition, limited reach"
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="w-full md:w-auto px-6 py-2 text-md font-semibold"
            >
              Generate Strategy
            </Button>
          </div>
        </form>
      </div>

      {/* Dialog for Loading */}
      <Dialog open={open}>
        <DialogContent className="text-center space-y-3">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Generating Report...
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Please wait while we create your market expansion strategy.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
