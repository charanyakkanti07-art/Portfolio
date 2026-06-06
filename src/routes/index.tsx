import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import VideoIntro from "@/components/portfolio/VideoIntro";
import AboutSection from "@/components/portfolio/AboutSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";
import MarqueeSection from "@/components/portfolio/MarqueeSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charan Reddy Yakkanti — AI & Data Science Portfolio" },
      {
        name: "description",
        content:
          "Computer Science undergraduate specializing in AI and Data Science. Building intelligent full-stack applications with Python, Java, and modern web technologies.",
      },
      {
        property: "og:title",
        content: "Charan Reddy Yakkanti — AI & Data Science Portfolio",
      },
      {
        property: "og:description",
        content:
          "Cinematic portfolio of Charan Reddy Yakkanti, featuring HostelMate — a smart hostel discovery and management platform.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <VideoIntro onScrollDown={scrollToContent} />
      <div ref={contentRef}>
        <AboutSection />
        <ServicesSection />
        <ProjectShowcase />
        <MarqueeSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
