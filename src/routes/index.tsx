import { createFileRoute } from "@tanstack/react-router";
import { JobBoard } from "@/components/job-board/JobBoard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigiCareers — The talent layer for digital marketing" },
      { name: "description", content: "A curated job board for AdOps, Programmatic, SEO, Social, Affiliate, Design, WordPress and AI Marketing roles. Built for specialists, by specialists." },
      { property: "og:title", content: "DigiCareers — The talent layer for digital marketing" },
      { property: "og:description", content: "A curated job board for AdOps, Programmatic, SEO, Social, Affiliate, Design, WordPress and AI Marketing roles." },
    ],
  }),
  component: Index,
});

function Index() {
  return <JobBoard />;
}
