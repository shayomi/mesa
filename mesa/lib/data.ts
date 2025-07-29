import {
  LucideGlobe,
  LucideSearch,
  LucideFileText,
  LucideIcon,
  Search,
  ShieldCheck,
  Users,
  BadgeAlert,
  Plane,
  Landmark,
  BriefcaseBusiness,
} from "lucide-react";

import {} from "lucide-react";

export const howItWorksSteps = [
  {
    icon: LucideSearch,
    title: "Input Your Business Context",
    description:
      "Select your industry, business model, and target region to tailor the insights to your startup’s strategy.",
  },
  {
    icon: LucideGlobe,
    title: "Analyze Market Potential",
    description:
      "Leverage AI to assess market size, competition, talent availability, and regulatory environments.",
  },
  {
    icon: LucideFileText,
    title: "Generate Actionable Reports",
    description:
      "Receive a detailed strategy playbook to guide your expansion, including GTM suggestions and risk analysis.",
  },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const poweredByGptFeatures: Feature[] = [
  {
    icon: Search,
    title: "PESTLE Analysis",
    description:
      "Understand the political, economic, social, technological, legal, and environmental factors.",
  },
  {
    icon: ShieldCheck,
    title: "Porter's Forces",
    description:
      "Analyze the competitive intensity and attractiveness of the industry.",
  },
  {
    icon: BadgeAlert,
    title: "Risk Assessment",
    description: "Identify and mitigate potential risks in the new market.",
  },
  {
    icon: Users,
    title: "Personas",
    description: "Create detailed profiles of your ideal customers.",
  },
];

export const IdealUsersArray: Feature[] = [
  {
    icon: Plane,
    title: "Startup Founder",
    description: "Launch your startup in new markets with confidence.",
  },
  {
    icon: Landmark,
    title: "VCs",
    description: "Make informed investment decisions with market insights.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Consultants",
    description: "Provide clients with data-driven expansion strategies.",
  },
  {
    icon: Users,
    title: "Expansion Teams",
    description: "Streamline your team's market entry process.",
  },
];
