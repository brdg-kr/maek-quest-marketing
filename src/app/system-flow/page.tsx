import type { Metadata } from "next";
import { HomeExperience } from "../HomeExperience";

export const metadata: Metadata = {
  title: "Source Material Becomes Defensible Intelligence",
  description:
    "A focused MAEK marketing page showing how source materials become a dataset package, knowledge graph, and defensible work outputs.",
  alternates: {
    canonical: "/system-flow",
  },
};

export default function SystemFlowPage() {
  return <HomeExperience />;
}
