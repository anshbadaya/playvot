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
  {
    title: "Women's Final: Pune Vs Nagpur",
    category: "Kabaddi",
    image: "/assets/kabaddi3.jpg",
    views: 320,
    slug: "kabaddi-pune-vs-nagpur",
  },
  {
    title: "Men's Quarterfinal: Kolhapur Vs Aurangabad",
    category: "Kabaddi",
    image: "/assets/kabaddi4.jpg",
    views: 198,
    slug: "kabaddi-kolhapur-vs-aurangabad",
  },
  {
    title: "Women's Semi: Mumbai Vs Thane",
    category: "Kabaddi",
    image: "/assets/kabaddi5.jpg",
    views: 245,
    slug: "kabaddi-mumbai-vs-thane",
  },
  {
    title: "Men's League: Nashik Vs Sangli",
    category: "Kabaddi",
    image: "/assets/kabaddi6.jpg",
    views: 167,
    slug: "kabaddi-nashik-vs-sangli",
  },
  {
    title: "Women's League: Satara Vs Raigad",
    category: "Kabaddi",
    image: "/assets/kabaddi7.jpg",
    views: 134,
    slug: "kabaddi-satara-vs-raigad",
  },
  {
    title: "Men's Final: Solapur Vs Beed",
    category: "Kabaddi",
    image: "/assets/kabaddi8.jpg",
    views: 389,
    slug: "kabaddi-solapur-vs-beed",
  },
  {
    title: "Women's Quarterfinal: Latur Vs Akola",
    category: "Kabaddi",
    image: "/assets/kabaddi9.jpg",
    views: 176,
    slug: "kabaddi-latur-vs-akola",
  },
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
  {
    title: "Men's Singles: Sydney vs Perth",
    category: "Badminton",
    image: "/assets/badminton3.jpg",
    views: 78,
    slug: "badminton-sydney-vs-perth",
  },
  {
    title: "Women's Doubles: Adelaide vs Brisbane",
    category: "Badminton",
    image: "/assets/badminton4.jpg",
    views: 65,
    slug: "badminton-adelaide-vs-brisbane",
  },
  {
    title: "Mixed Doubles: Melbourne vs Canberra",
    category: "Badminton",
    image: "/assets/badminton5.jpg",
    views: 92,
    slug: "badminton-melbourne-vs-canberra",
  },
  {
    title: "Men's Doubles: Tasmania vs Darwin",
    category: "Badminton",
    image: "/assets/badminton6.jpg",
    views: 47,
    slug: "badminton-tasmania-vs-darwin",
  },
  {
    title: "Women's Singles: Gold Coast vs Hobart",
    category: "Badminton",
    image: "/assets/badminton7.jpg",
    views: 53,
    slug: "badminton-gold-coast-vs-hobart",
  },
  {
    title: "Men's Semi: Victoria vs Queensland",
    category: "Badminton",
    image: "/assets/badminton8.jpg",
    views: 88,
    slug: "badminton-victoria-vs-queensland",
  },
  {
    title: "Women's Final: NSW Thunder vs Adelaide",
    category: "Badminton",
    image: "/assets/badminton9.jpg",
    views: 112,
    slug: "badminton-nsw-thunder-vs-adelaide",
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
  {
    title: "Kandivali FC Vs Borivali FC",
    category: "Football",
    image: "/assets/football3.jpg",
    views: 95,
    date: "Jul 22, 2025",
    slug: "football-kandivali-vs-borivali",
  },
  {
    title: "Malad FC Vs Goregaon FC",
    category: "Football",
    image: "/assets/football4.jpg",
    views: 62,
    date: "Jul 22, 2025",
    slug: "football-malad-vs-goregaon",
  },
  {
    title: "Andheri FC Vs Versova FC",
    category: "Football",
    image: "/assets/football5.jpg",
    views: 77,
    date: "Jul 23, 2025",
    slug: "football-andheri-vs-versova",
  },
  {
    title: "Dahisar FC Vs Mira Road FC",
    category: "Football",
    image: "/assets/football6.jpg",
    views: 55,
    date: "Jul 23, 2025",
    slug: "football-dahisar-vs-mira-road",
  },
  {
    title: "Bandra FC Vs Khar FC",
    category: "Football",
    image: "/assets/football7.jpg",
    views: 103,
    date: "Jul 24, 2025",
    slug: "football-bandra-vs-khar",
  },
  {
    title: "Santacruz FC Vs Vile Parle FC",
    category: "Football",
    image: "/assets/football8.jpg",
    views: 81,
    date: "Jul 24, 2025",
    slug: "football-santacruz-vs-vile-parle",
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
