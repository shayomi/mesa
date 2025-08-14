/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const HomeNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-30 px-4 sm:px-8 lg:px-12 py-4 bg-transparent ">
      <div className="flex justify-between items-center w-full">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img
            src="assets/logo/mesa-dark.svg"
            alt="Mesa Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Middle: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-secondary">
          {["About", "Blog", "Contact"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <Typography
                variant="smallText"
                className="font-bold text-secondary hover:text-primary transition-colors"
              >
                {item}
              </Typography>
            </Link>
          ))}
        </div>

        {/* Right: Always visible Dashboard + Auth */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild size="sm" variant="default">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <Button
              size="sm"
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              Sign Up
            </Button>
          </SignedOut>

          {/* Mobile toggle button */}
          <div className="lg:hidden">
            <button
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 space-y-4 border-t border-gray-200 pt-4">
          {["About", "Blog", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block font-medium text-gray-700 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default HomeNav;
