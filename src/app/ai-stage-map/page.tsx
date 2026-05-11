import type { Metadata } from "next";
import { AiStageMapExperience } from "./AiStageMapExperience";

export const metadata: Metadata = {
  title: "Where is your company in the AI transition?",
  description:
    "A stage map for diagnosing AI adoption pressure, vibe coding growth, data connection bottlenecks, and MAEK's transition structure.",
};

export default function AiStageMapPage() {
  return <AiStageMapExperience />;
}
