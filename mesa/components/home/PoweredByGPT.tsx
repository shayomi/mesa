import { poweredByGptFeatures } from "@/lib/data";
import { FC } from "react";

const PoweredByGPTSection: FC = () => {
  return (
    <section className=" mx-auto px-12 py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        Powered by GPT and Business Strategy Frameworks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {poweredByGptFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PoweredByGPTSection;
