import type { Metadata } from "next";
import { StoryHomeExperience } from "../StoryHomeExperience";

export const metadata: Metadata = {
  title: "AI Transition Stories",
  description:
    "A MAEK story page about the human strain of AI transition, vibe coding, late-night learning, and grounded company knowledge.",
  alternates: {
    canonical: "/stories",
  },
};

export default function StoriesPage() {
  return <StoryHomeExperience />;
}
