import WhyStrategistAgent from "@/components/home/About";
import Action from "@/components/home/Action";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import IdealUser from "@/components/home/IdealUser";
import PoweredByGPTSection from "@/components/home/PoweredByGPT";

const SECTIONS = [
  // { Component: DemoDayHero, className: "z-10 relative" },
  { Component: HomeHero, className: "relative -mt-24" },
  { Component: HowItWorks, className: "relative mt-12" },
  { Component: PoweredByGPTSection, className: "relative mt-12" },
  { Component: WhyStrategistAgent, className: "relative mt-12" },
  { Component: IdealUser, className: "relative mt-12" },
  { Component: Action, className: "relative mt-12" },
];

export default function Home() {
  return (
    <main className="pb-20 overflow-hidden">
      {SECTIONS.map(({ Component, className }, index) => (
        <section key={index} className={className}>
          <Component />
        </section>
      ))}
    </main>
  );
}
