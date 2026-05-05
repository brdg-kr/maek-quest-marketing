import type { Metadata } from "next";
import { PageFiveExperience } from "./PageFiveExperience";

export const metadata: Metadata = {
  title: "Source Material Becomes Defensible Intelligence",
  description:
    "A focused MAEK marketing page with a smooth-loading evidence pipeline image and hover detail cards for each major system region.",
  alternates: {
    canonical: "/5",
  },
};

export default function PageFive() {
  return <PageFiveExperience />;
}
