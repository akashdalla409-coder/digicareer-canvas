export type Job = {
  id: string;
  company: string;
  title: string;
  role: string;
  level: "Fresher" | "Internship" | "Experience" | "Senior";
  type: "Full time" | "Remote" | "Contract";
  location: string;
  salary: string;
  postedAgo: string;
  featured?: boolean;
};

export const ROLES = [
  "AdOps",
  "Ad Operations",
  "Digital Marketing",
  "Media Buyer",
  "Programmatic Campaign Manager",
  "Programmatic Advertising",
  "SEO",
  "Social Media Expert",
  "Affiliate Marketing",
  "Designer",
  "WordPress Developer",
  "AI Marketer",
] as const;

export const LEVELS = ["Fresher", "Internship", "Experience", "Senior"] as const;
export const TYPES = ["Full time", "Remote", "Contract"] as const;

export const JOBS: Job[] = [
  {
    id: "1",
    company: "Aura Commerce",
    title: "Lead Programmatic Campaign Manager",
    role: "Programmatic Campaign Manager",
    level: "Senior",
    type: "Remote",
    location: "Remote · Global",
    salary: "$140k – $180k",
    postedAgo: "2h ago",
    featured: true,
  },
  {
    id: "2",
    company: "Stellar Agency",
    title: "Performance Media Buyer",
    role: "Media Buyer",
    level: "Experience",
    type: "Full time",
    location: "New York, NY",
    salary: "$90k – $120k",
    postedAgo: "5h ago",
  },
  {
    id: "3",
    company: "Nexus AI",
    title: "Generative AI Marketing Specialist",
    role: "AI Marketer",
    level: "Senior",
    type: "Remote",
    location: "Remote · US/EU",
    salary: "$160k + Equity",
    postedAgo: "1d ago",
    featured: true,
  },
  {
    id: "4",
    company: "Origin Studio",
    title: "SEO & Content Strategist",
    role: "SEO",
    level: "Experience",
    type: "Full time",
    location: "London, UK",
    salary: "£55k – £70k",
    postedAgo: "2d ago",
  },
  {
    id: "5",
    company: "Halo Media",
    title: "Junior AdOps Trafficker",
    role: "AdOps",
    level: "Fresher",
    type: "Full time",
    location: "Mumbai, IN",
    salary: "₹6L – ₹9L",
    postedAgo: "3d ago",
  },
  {
    id: "6",
    company: "Drift Collective",
    title: "Social Media Lead (TikTok-first)",
    role: "Social Media Expert",
    level: "Experience",
    type: "Contract",
    location: "Remote · Americas",
    salary: "$8k / mo",
    postedAgo: "3d ago",
  },
  {
    id: "7",
    company: "Verve Labs",
    title: "WordPress Developer (Headless)",
    role: "WordPress Developer",
    level: "Experience",
    type: "Remote",
    location: "Remote · EU",
    salary: "€55k – €75k",
    postedAgo: "4d ago",
  },
  {
    id: "8",
    company: "Kindling Studio",
    title: "Brand & Marketing Designer",
    role: "Designer",
    level: "Experience",
    type: "Full time",
    location: "Berlin, DE",
    salary: "€60k – €78k",
    postedAgo: "5d ago",
  },
  {
    id: "9",
    company: "Loop Partners",
    title: "Affiliate Marketing Manager",
    role: "Affiliate Marketing",
    level: "Senior",
    type: "Full time",
    location: "Austin, TX",
    salary: "$110k – $135k",
    postedAgo: "6d ago",
  },
  {
    id: "10",
    company: "Forge & Co.",
    title: "Marketing Internship — Summer Cohort",
    role: "Digital Marketing",
    level: "Internship",
    type: "Full time",
    location: "Lisbon, PT",
    salary: "€1.8k / mo",
    postedAgo: "1w ago",
  },
];