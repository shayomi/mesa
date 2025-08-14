"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/Variants";

const WhyStrategistAgent = () => {
  return (
    <motion.section className="bg-[#121212] text-white mt-24 py-16 px-6 lg:px-20 flex flex-col lg:flex-row gap-10 items-center">
      <motion.div className="flex-1 max-w-xl">
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 0.8)}
          initial="hidden"
          whileInView={"show"}
          exit={"show"}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-2">
            AI-Powered Research Engine
          </h3>
          <p className="text-gray-300">
            Instantly analyze new markets, generate go-to-market plans, and
            uncover competitive insights using real-time data. The agent
            synthesizes regulatory, cultural, and economic variables into
            actionable strategies.
          </p>
        </motion.div>
        <Separator className="my-6 bg-gray-700" />

        <motion.div
          variants={fadeIn("right", "tween", 0.4, 0.8)}
          initial="hidden"
          whileInView={"show"}
          exit={"show"}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-2">
            Rapid Market Fit Discovery
          </h3>
          <p className="text-gray-300">
            Cut weeks of manual research into minutes. From TAM sizing to
            customer segmentation, discover which regions offer the best
            ROI—faster than ever.
          </p>
        </motion.div>
        <Separator className="my-6 bg-gray-700" />

        <motion.div
          variants={fadeIn("right", "tween", 0.6, 0.8)}
          initial="hidden"
          whileInView={"show"}
          exit={"show"}
        >
          <h3 className="text-xl font-semibold mb-2">Customizable Playbooks</h3>
          <p className="text-gray-300">
            Get strategy templates tailored to your startup stage, industry, and
            region. Export reports or refine insights via natural language
            conversations with the agent.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeIn("left", "tween", 0.4, 0.8)}
        initial="hidden"
        whileInView={"show"}
        exit={"show"}
        className="flex-1 flex-col items-end "
      >
        <h2 className="text-4xl font-bold mb-8">
          Why the Market Expansion Strategist Agent Stands Out
        </h2>
        <Image
          src="/assets/images/ai-agent.webp"
          alt="Market Expansion Strategist Agent Screenshot"
          width={600}
          height={400}
          className="rounded-xl shadow-xl border border-gray-700 mt-8"
        />
      </motion.div>
    </motion.section>
  );
};

export default WhyStrategistAgent;
