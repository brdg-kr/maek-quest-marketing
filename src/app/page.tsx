import type { Metadata } from "next";
import { StoryHomeExperience } from "./StoryHomeExperience";

export const metadata: Metadata = {
  title: "AI Transition Stories",
  description:
    "A softer MAEK home about the human strain of AI transition, vibe coding, late-night learning, and turning company materials into a grounded structure.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <StoryHomeExperience />;
}
