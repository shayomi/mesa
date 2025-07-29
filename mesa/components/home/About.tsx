import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const WhyStrategistAgent = () => {
  return (
    <section className="bg-[#121212] text-white py-16 px-6 lg:px-20 flex flex-col lg:flex-row gap-10 items-center">
      <div className="flex-1 max-w-xl">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            AI-Powered Research Engine
          </h3>
          <p className="text-gray-300">
            Instantly analyze new markets, generate go-to-market plans, and
            uncover competitive insights using real-time data. The agent
            synthesizes regulatory, cultural, and economic variables into
            actionable strategies.
          </p>
        </div>
        <Separator className="my-6 bg-gray-700" />

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            Rapid Market Fit Discovery
          </h3>
          <p className="text-gray-300">
            Cut weeks of manual research into minutes. From TAM sizing to
            customer segmentation, discover which regions offer the best
            ROI—faster than ever.
          </p>
        </div>
        <Separator className="my-6 bg-gray-700" />

        <div>
          <h3 className="text-xl font-semibold mb-2">Customizable Playbooks</h3>
          <p className="text-gray-300">
            Get strategy templates tailored to your startup stage, industry, and
            region. Export reports or refine insights via natural language
            conversations with the agent.
          </p>
        </div>
      </div>

      <div className="flex-1 flex-col items-end ">
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
      </div>
    </section>
  );
};

export default WhyStrategistAgent;
