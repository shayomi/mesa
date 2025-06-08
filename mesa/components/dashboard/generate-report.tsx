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
    a.download = "Market-Expansion-Strategy.pdf";
    a.click();

    setOpen(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-xl mx-auto">
        <Input name="companyName" placeholder="Company Name" required />
        <Input name="industry" placeholder="Industry" required />
        <Input name="currentMarket" placeholder="Current Market" required />
        <Input name="targetMarkets" placeholder="Target Markets" required />
        <Textarea
          name="products"
          placeholder="Describe your products/services"
          required
        />
        <Textarea name="goals" placeholder="Business Goals" />
        <Textarea name="challenges" placeholder="Current Challenges" />
        <Button type="submit">Generate Strategy</Button>
      </form>

      <Dialog open={open}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Generating Report...</DialogTitle>
          </DialogHeader>
          <p>Please wait while we create your market expansion strategy.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
