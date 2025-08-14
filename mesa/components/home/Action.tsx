"use client";

import React from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/Variants";
import Link from "next/link";

const Action = () => {
  return (
    <motion.section className="mt-24">
      <motion.div
        variants={fadeIn("down", "tween", 0.4, 0.8)}
        initial="hidden"
        whileInView={"show"}
        exit={"show"}
        className=" flex flex-col items-center text-center px-12"
      >
        <Typography variant="h1" className="font-bold">
          Ready to Expand?
        </Typography>
        <Typography variant="p" className="font-semibold">
          Login or signup to get started
        </Typography>
        <Link href="/sign-in">
          <Button size="lg" variant="default" className="mt-4">
            {" "}
            Start building your market strategy today
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Action;
