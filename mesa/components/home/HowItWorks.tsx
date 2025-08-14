"use client";

import React from "react";
import { Typography } from "../ui/typography";
import { howItWorksSteps } from "@/lib/data";
import ChatBox from "./ChatBox";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/Variants";

const HowItWorks = () => {
  return (
    <motion.section className="mt-48">
      <motion.div className="px-6 md:px-12">
        <Typography
          variant="h2"
          className="mb-10 text-start font-bold text-slate-800"
        >
          How It Works
        </Typography>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                variants={fadeIn("down", "tween", index * 0.2, 0.8)}
                initial="hidden"
                whileInView={"show"}
                exit={"show"}
                key={index}
                className="bg-white dark:bg-slate-900 border text-center justify-center border-blue-300 rounded-2xl px-6 py-16 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center mx-auto w-14 h-14 rounded-full bg-blue-300 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <Typography variant="h4" className="mb-2">
                  {step.title}
                </Typography>
                <Typography variant="mutedText">{step.description}</Typography>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-24">
          <ChatBox />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HowItWorks;
