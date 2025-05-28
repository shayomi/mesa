/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import React from "react";

const HomeNav = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-30 px-12 py-4">
      <div className="flex flex-row justify-between gap-4 items-center">
        <div>
          <img
            src="assets/logo/mesa-dark.svg"
            alt="Homepage hero image"
            className="h-16 w-32"
          />
        </div>
        <div className="flex justigy-around gap-8 items-center text-secondary">
          <Link href="">
            <Typography
              variant="smallText"
              className="font-bold text-secondary"
            >
              About
            </Typography>
          </Link>
          <Link href="">
            <Typography
              variant="smallText"
              className="font-bold text-secondary"
            >
              Blog
            </Typography>
          </Link>
          <Link href="">
            <Typography
              variant="smallText"
              className="font-bold text-secondary"
            >
              Contact
            </Typography>
          </Link>
          <div className="flex flex-row gap-2 ml-12 items-center">
            <Button
              variant="default"
              className="cursor-pointer bg-blue-300 text-black"
            >
              Sign In
            </Button>
            <Button variant="outline" className="cursor-pointer text-blue-500">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
