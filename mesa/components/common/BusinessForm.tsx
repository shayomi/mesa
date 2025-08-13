/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IBusiness } from "@/lib/database/models/business.model";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { FileUploader } from "./FileUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { businessFormSchema } from "@/lib/validator";
import { createBusiness, updateBusiness } from "@/lib/actions/business.action";
import Dropdown from "./Dropdown";
import { Typography } from "../ui/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Building2,
  Globe,
  Target,
  Users,
  Goal,
  AlertCircle,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";

interface BusinessFormProps {
  userId: string;
  type: "Create" | "Update";
  business?: IBusiness;
  businessId?: string;
}

const BusinessForm = ({
  userId,
  type,
  business,
  businessId,
}: BusinessFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: business || {
      businessName: "",
      description: "",
      location: "",
      imageUrl: "",
      industryId: "",
      targetAudience: "",
      goals: "",
      companySize: "",
      region: [],
      painPoint: "",
      targetMarket: [],
      reportFrequency: "none",
    },
  });

  async function onSubmit(values: z.infer<typeof businessFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;
      uploadedImageUrl = uploadedImages[0].url;
    }

    const payload = { ...values, imageUrl: uploadedImageUrl };

    try {
      if (type === "Create") {
        const newBusiness = await createBusiness({
          userId,
          business: payload,
          path: "/dashboard",
        });
        if (newBusiness) {
          form.reset();
          router.push(`/dashboard/business/${newBusiness._id}`);
        }
      } else if (type === "Update" && businessId) {
        const updatedBusiness = await updateBusiness({
          userId,
          business: { ...payload, _id: businessId },
          path: `/business/${businessId}`,
        });
        if (updatedBusiness) {
          form.reset();
          router.push(`/business/${updatedBusiness._id}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-6 w-6 text-blue-600" />
            <Typography variant="h3" className="font-bold">
              {type} Business Profile
            </Typography>
            {type === "Update" && (
              <Badge variant="secondary" className="ml-2">
                Editing Mode
              </Badge>
            )}
          </div>

          {/* Basic Information Section */}
          <div className="space-y-6">
            <Typography
              variant="h4"
              className="flex items-center gap-2 text-gray-700"
            >
              <Building2 className="h-5 w-5" />
              Basic Information
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="businessName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Inc."
                        {...field}
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="industryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Dropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your business..."
                      {...field}
                      className="min-h-[120px] bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="imageUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Logo</FormLabel>
                  <FormControl>
                    <FileUploader
                      imageUrl={field.value}
                      onFieldChange={field.onChange}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Location & Size Section */}
        <Card className="p-6 border-0 shadow-sm">
          <Typography
            variant="h4"
            className="flex items-center gap-2 text-gray-700 mb-6"
          >
            <Globe className="h-5 w-5" />
            Location & Size
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City, Country"
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="companySize"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Company Size
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 50 employees"
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="reportFrequency"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Report Frequency
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No automatic reports</SelectItem>
                      <SelectItem value="weekly">Weekly reports</SelectItem>
                      <SelectItem value="monthly">Monthly reports</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Market & Goals Section */}
        <Card className="p-6 border-0 shadow-sm">
          <Typography
            variant="h4"
            className="flex items-center gap-2 text-gray-700 mb-6"
          >
            <Target className="h-5 w-5" />
            Market & Goals
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="targetAudience"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Who are your customers?"
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="goals"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Goal className="h-4 w-4" />
                    Business Goals
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are you trying to achieve?"
                      {...field}
                      className="bg-gray-50 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="painPoint"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Pain Points
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What challenges are you facing?"
                      {...field}
                      className="bg-gray-50 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              name="region"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Target Regions
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter regions (comma separated)"
                      value={field.value?.join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((r) => r.trim())
                        )
                      }
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="targetMarket"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Target Markets
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter markets (comma separated)"
                      value={field.value?.join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((t) => t.trim())
                        )
                      }
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="min-w-[150px]"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {type === "Create" ? "Creating..." : "Updating..."}
              </span>
            ) : (
              <span>
                {type === "Create" ? "Create Business" : "Update Business"}
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessForm;
