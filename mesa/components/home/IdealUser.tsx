"use client";

import { IdealUsersArray } from "@/lib/data";
import { fadeIn } from "@/lib/Variants";
import { motion } from "framer-motion";
import { FC } from "react";

const IdealUser: FC = () => {
  return (
    <motion.section className=" mx-auto px-12 py-16 mt-24">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        Our Ideal Users
      </h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {IdealUsersArray.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              variants={fadeIn("left", "tween", index * 0.2, 0.8)}
              initial="hidden"
              whileInView={"show"}
              exit={"show"}
              key={index}
              className="flex flex-col items-center justify-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-5"
            >
              <div className="mt-1">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-center">
                <h3 className="text-base font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default IdealUser;
