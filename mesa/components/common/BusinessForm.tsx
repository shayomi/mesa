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
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { businessFormSchema } from "@/lib/validator";
import { createBusiness, updatebusiness } from "@/lib/actions/business.action";
import Dropdown from "./Dropdown";
import { Typography } from "../ui/typography";

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
        const updatedBusiness = await updatebusiness({
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <Typography variant="h4" className="mt-4">
          Business Information
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="businessName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Business Name" {...field} />
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

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="targetAudience"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Target Audience" {...field} />
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
                <FormControl>
                  <Input placeholder="Company Size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="goals"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Goals" {...field} />
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
                <FormControl>
                  <Textarea placeholder="Pain Point" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="region"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Regions (comma-separated)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((r) => r.trim())
                      )
                    }
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
                <FormControl>
                  <Input
                    placeholder="Target Market (comma-separated)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((t) => t.trim())
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-4"
        >
          {form.formState.isSubmitting ? `${type}...` : `${type} Business`}
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
