import type { Metadata } from "next";
import { AiStageMapExperience } from "./AiStageMapExperience";

export const metadata: Metadata = {
  title: "AI Adoption Stage Map",
  description:
    "A stage map for diagnosing AI adoption pressure, employee-built tools, data connection bottlenecks, and the next MAEK transition point.",
  alternates: {
    canonical: "/ai-stage-map",
  },
};

export default function AiStageMapPage() {
  return <AiStageMapExperience />;
}
