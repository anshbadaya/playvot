// pages/Matches.tsx
import React from "react";
import HighlightsSection from "@/components/Match/HighlightsSection";
import Layout from "@/components/Layout";
import { StyledBackground } from "@/components/Shared/StyledBackground";

const kabaddiData = [
  {
    title: "Men's Final: Parbhani Vs Chatrapati",
    category: "Kabaddi",
    image: "/assets/kabaddi1.jpg",
    views: 475,
    slug: "kabaddi-parbhani-vs-chatrapati",
  },
  {
    title: "Men's Semi: Jalgaon Vs Chatrapati",
    category: "Kabaddi",
    image: "/assets/kabaddi2.jpg",
    views: 111,
    slug: "kabaddi-jalgaon-vs-chatrapati",
  },
  // Add more items with unique slugs if needed
];

const badmintonData = [
  {
    title: "NSW Thunder vs Queensland",
    category: "Badminton",
    image: "/assets/badminton1.jpg",
    views: 54,
    slug: "badminton-nsw-vs-queensland",
  },
  {
    title: "Victoria vs NSW Lightning",
    category: "Badminton",
    image: "/assets/badminton2.jpg",
    views: 31,
    slug: "badminton-victoria-vs-nsw-lightning",
  },
];

const footballData = [
  {
    title: "Charkop FC Vs...",
    category: "Football",
    image: "/assets/football1.jpg",
    views: 88,
    date: "Jul 21, 2025",
    slug: "football-charkop",
  },
  {
    title: "Shelar FC Vs Poojary FC",
    category: "Football",
    image: "/assets/football2.jpg",
    views: 70,
    date: "Jul 21, 2025",
    slug: "football-shelar-vs-poojary",
  },
];

const Matches = () => {
  return (
    <Layout>
      <StyledBackground sx={{ pl: 2, py: 2 }}>
        <HighlightsSection
          sectionTitle="KABADDI: THE ULTIMATE TEAM GAME"
          items={kabaddiData}
        />
        <HighlightsSection sectionTitle="GAME. SET. SMASH." items={badmintonData} />
        <HighlightsSection
          sectionTitle="BANGER AFTER BANGER...!"
          items={footballData}
        />
      </StyledBackground>
    </Layout>
  );
};

export default Matches;
