import { 
  Brain, Baby, Users, Home, HeartHandshake, Stethoscope,
  type LucideIcon,
} from "lucide-react";
import svcNeurodiverse from "@/assets/svc-neurodiverse.jpg";
import svcChildren from "@/assets/svc-children.jpg";
import svcMentoring from "@/assets/svc-mentoring.jpg";
import svcCommunity from "@/assets/svc-community.jpg";
import svcBehaviour from "@/assets/svc-behaviour.jpg";
import svcNursing from "@/assets/svc-nursing.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  image: string;
  accent: "lavender" | "sage" | "peach" | "sky";
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "neurodiverse-support",
    title: "Neurodiverse Support",
    short: "Tailored, strengths-based support for neurodiverse individuals.",
    description:
      "Person-centred support that celebrates neurodiversity. We work with autistic, ADHD and otherwise neurodivergent participants to build routines, regulation and confidence.",
    icon: Brain,
    image: svcNeurodiverse,
    accent: "lavender",
    includes: [
      "1:1 strengths-based support sessions",
      "Sensory-friendly community outings",
      "Daily living routines & planning",
      "Communication & social coaching",
    ],
  },
  {
    slug: "support-for-children",
    title: "Support for Children",
    short: "Playful, gentle care for children with diverse needs.",
    description:
      "Safe, joyful support for children that nurtures development through play, creativity and connection — partnering closely with families and schools.",
    icon: Baby,
    image: svcChildren,
    accent: "peach",
    includes: [
      "Play-based developmental support",
      "School holiday programs",
      "Family liaison & coordination",
      "Skill-building activities",
    ],
  },
  {
    slug: "peer-mentoring",
    title: "Peer Mentoring & Skill Development",
    short: "Build confidence, independence and life skills with a mentor.",
    description:
      "Walk alongside a relatable mentor who's been there. From cooking to commuting to creative pursuits, we help you build the skills that matter.",
    icon: Users,
    image: svcMentoring,
    accent: "sage",
    includes: [
      "Goal-setting & life coaching",
      "Cooking, budgeting & travel training",
      "Vocational readiness",
      "Confidence-building activities",
    ],
  },
  {
    slug: "community-access",
    title: "Community Access & In-Home Support",
    short: "Helping you live, connect and thrive — at home and beyond.",
    description:
      "From household tasks to community outings, our team supports daily living with warmth, respect and reliability.",
    icon: Home,
    image: svcCommunity,
    accent: "sky",
    includes: [
      "Personal care & domestic assistance",
      "Transport to appointments",
      "Social & community participation",
      "Overnight & respite support",
    ],
  },
  {
    slug: "behaviour-support",
    title: "Behaviour Support",
    short: "Positive, evidence-based behaviour support plans.",
    description:
      "Our practitioners design positive behaviour support plans that reduce restrictive practices and improve quality of life.",
    icon: HeartHandshake,
    image: svcBehaviour,
    accent: "lavender",
    includes: [
      "Functional behaviour assessments",
      "Positive behaviour support plans",
      "Family & staff training",
      "Ongoing review & coaching",
    ],
  },
  {
    slug: "community-nursing",
    title: "Community Nursing Care",
    short: "Qualified nursing care delivered in the comfort of home.",
    description:
      "Registered nurses deliver clinical care in your home — from medication management to complex care needs — with compassion and dignity.",
    icon: Stethoscope,
    image: svcNursing,
    accent: "sage",
    includes: [
      "Medication management",
      "Wound care & continence support",
      "Health monitoring",
      "Care coordination with GPs",
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "About Us", href: "/about" }, // ✅ added here
  { label: "Group Activities", href: "/group-activities" },
  { label: "Work With Us", href: "/work-with-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];