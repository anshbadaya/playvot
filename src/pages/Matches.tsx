// pages/Matches.tsx
import React from "react";
import Layout from "@/components/Layout";
import MatchCard from "@/components/Match/MatchCard";
import { Box, Container, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const matchesByType = {
  cricket: [
    {
      matchType: "IPL",
      matchTitle: "Mumbai Indians vs Chennai Super Kings",
      team1: { name: "MI", score: "186/4", overs: "20" },
      team2: { name: "CSK", score: "189/2", overs: "19.2" },
      status: "CSK won by 8 wickets",
      sportType: "cricket",
      slug: "mi-vs-csk-2024"
    },
    {
      matchType: "Ranji Trophy",
      matchTitle: "Mumbai vs Karnataka",
      team1: { name: "MUM", score: "324/6", overs: "90" },
      team2: { name: "KAR", score: "156/3", overs: "45" },
      status: "Day 2 - Karnataka trail by 168 runs",
      sportType: "cricket",
      slug: "mum-vs-kar-2024"
    },
    {
      matchType: "IPL",
      matchTitle: "Royal Challengers vs Rajasthan Royals",
      team1: { name: "RCB", score: "192/4", overs: "20" },
      team2: { name: "RR", score: "156/8", overs: "20" },
      status: "RCB won by 36 runs",
      sportType: "cricket",
      slug: "rcb-vs-rr-2024"
    },
    {
      matchType: "IPL",
      matchTitle: "Gujarat Titans vs Punjab Kings",
      team1: { name: "GT", score: "175/6", overs: "20" },
      team2: { name: "PBKS", score: "0/0", overs: "0" },
      status: "Match starts at 7:30 PM",
      sportType: "cricket",
      slug: "gt-vs-pbks-2024",
      isLive: true
    },
    {
      matchType: "Test",
      matchTitle: "India vs England",
      team1: { name: "IND", score: "416/8", overs: "112" },
      team2: { name: "ENG", score: "0/0", overs: "0" },
      status: "Day 2 - Session 1",
      sportType: "cricket",
      slug: "ind-vs-eng-2024",
      isLive: true
    },
    {
      matchType: "IPL",
      matchTitle: "Delhi Capitals vs Sunrisers Hyderabad",
      team1: { name: "DC", score: "167/8", overs: "20" },
      team2: { name: "SRH", score: "171/4", overs: "19.1" },
      status: "SRH won by 6 wickets",
      sportType: "cricket",
      slug: "dc-vs-srh-2024"
    },
    {
      matchType: "IPL",
      matchTitle: "Kolkata Knight Riders vs Lucknow Giants",
      team1: { name: "KKR", score: "182/6", overs: "20" },
      team2: { name: "LSG", score: "184/4", overs: "19.3" },
      status: "LSG won by 6 wickets",
      sportType: "cricket",
      slug: "kkr-vs-lsg-2024"
    },
    {
      matchType: "Ranji Trophy",
      matchTitle: "Tamil Nadu vs Bengal",
      team1: { name: "TN", score: "345/7", overs: "90" },
      team2: { name: "BEN", score: "0/0", overs: "0" },
      status: "Day 1 - Stumps",
      sportType: "cricket",
      slug: "tn-vs-ben-2024"
    },
    {
      matchType: "Test",
      matchTitle: "Australia vs New Zealand",
      team1: { name: "AUS", score: "256/4", overs: "78" },
      team2: { name: "NZ", score: "0/0", overs: "0" },
      status: "Day 1 - Tea Break",
      sportType: "cricket",
      slug: "aus-vs-nz-2024",
      isLive: true
    },
    {
      matchType: "ODI",
      matchTitle: "South Africa vs Pakistan",
      team1: { name: "SA", score: "298/5", overs: "50" },
      team2: { name: "PAK", score: "186/4", overs: "35" },
      status: "Pakistan need 113 runs in 15 overs",
      sportType: "cricket",
      slug: "sa-vs-pak-2024",
      isLive: true
    }
  ],
  kabaddi: [
    {
      matchType: "PKL",
      matchTitle: "Patna Pirates vs Bengal Warriors",
      team1: { name: "Patna Pirates", points: 38 },
      team2: { name: "Bengal Warriors", points: 42 },
      status: "Bengal Warriors won",
      sportType: "kabaddi",
      slug: "patna-vs-bengal-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "U Mumba vs Jaipur Pink Panthers",
      team1: { name: "U Mumba", points: 28 },
      team2: { name: "Jaipur Pink Panthers", points: 32 },
      status: "Match in progress",
      sportType: "kabaddi",
      slug: "mumba-vs-jaipur-2024",
      isLive: true
    },
    {
      matchType: "PKL",
      matchTitle: "Telugu Titans vs Tamil Thalaivas",
      team1: { name: "Telugu Titans", points: 45 },
      team2: { name: "Tamil Thalaivas", points: 41 },
      status: "Telugu Titans won",
      sportType: "kabaddi",
      slug: "telugu-vs-tamil-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "Dabang Delhi vs Gujarat Giants",
      team1: { name: "Dabang Delhi", points: 35 },
      team2: { name: "Gujarat Giants", points: 35 },
      status: "Match tied",
      sportType: "kabaddi",
      slug: "delhi-vs-gujarat-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "Puneri Paltan vs Haryana Steelers",
      team1: { name: "Puneri Paltan", points: 42 },
      team2: { name: "Haryana Steelers", points: 39 },
      status: "Final minutes",
      sportType: "kabaddi",
      slug: "pune-vs-haryana-2024",
      isLive: true
    },
    {
      matchType: "PKL",
      matchTitle: "UP Yoddhas vs Bengaluru Bulls",
      team1: { name: "UP Yoddhas", points: 0 },
      team2: { name: "Bengaluru Bulls", points: 0 },
      status: "Starts at 8:30 PM",
      sportType: "kabaddi",
      slug: "up-vs-bengaluru-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "Bengal Warriors vs Gujarat Giants",
      team1: { name: "Bengal Warriors", points: 0 },
      team2: { name: "Gujarat Giants", points: 0 },
      status: "Tomorrow, 7:30 PM",
      sportType: "kabaddi",
      slug: "bengal-vs-gujarat-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "Patna Pirates vs U Mumba",
      team1: { name: "Patna Pirates", points: 0 },
      team2: { name: "U Mumba", points: 0 },
      status: "Tomorrow, 8:30 PM",
      sportType: "kabaddi",
      slug: "patna-vs-mumba-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "Telugu Titans vs Dabang Delhi",
      team1: { name: "Telugu Titans", points: 0 },
      team2: { name: "Dabang Delhi", points: 0 },
      status: "Day After, 7:30 PM",
      sportType: "kabaddi",
      slug: "telugu-vs-delhi-2024"
    },
    {
      matchType: "PKL",
      matchTitle: "Tamil Thalaivas vs Puneri Paltan",
      team1: { name: "Tamil Thalaivas", points: 0 },
      team2: { name: "Puneri Paltan", points: 0 },
      status: "Day After, 8:30 PM",
      sportType: "kabaddi",
      slug: "tamil-vs-pune-2024"
    }
  ],
  football: [
    {
      matchType: "ISL",
      matchTitle: "Mumbai City FC vs Bengaluru FC",
      team1: { name: "Mumbai City FC", goals: 2 },
      team2: { name: "Bengaluru FC", goals: 1 },
      status: "75' - Second Half",
      sportType: "football",
      slug: "mumbai-vs-bengaluru-2024",
      isLive: true
    },
    {
      matchType: "ISL",
      matchTitle: "Kerala Blasters vs Chennaiyin FC",
      team1: { name: "Kerala Blasters", goals: 0 },
      team2: { name: "Chennaiyin FC", goals: 0 },
      status: "Today, 7:30 PM",
      sportType: "football",
      slug: "kerala-vs-chennai-2024"
    },
    {
      matchType: "ISL",
      matchTitle: "FC Goa vs NorthEast United",
      team1: { name: "FC Goa", goals: 3 },
      team2: { name: "NorthEast United", goals: 1 },
      status: "Full Time",
      sportType: "football",
      slug: "goa-vs-northeast-2024"
    },
    {
      matchType: "ISL",
      matchTitle: "Mohun Bagan vs East Bengal",
      team1: { name: "Mohun Bagan", goals: 2 },
      team2: { name: "East Bengal", goals: 2 },
      status: "90' - Match Drawn",
      sportType: "football",
      slug: "mohun-vs-east-2024"
    },
    {
      matchType: "ISL",
      matchTitle: "Hyderabad FC vs Jamshedpur FC",
      team1: { name: "Hyderabad FC", goals: 1 },
      team2: { name: "Jamshedpur FC", goals: 1 },
      status: "60' - Second Half",
      sportType: "football",
      slug: "hyderabad-vs-jamshedpur-2024",
      isLive: true
    },
    {
      matchType: "I-League",
      matchTitle: "Real Kashmir vs Churchill Brothers",
      team1: { name: "Real Kashmir", goals: 2 },
      team2: { name: "Churchill Brothers", goals: 0 },
      status: "Full Time",
      sportType: "football",
      slug: "kashmir-vs-churchill-2024"
    },
    {
      matchType: "I-League",
      matchTitle: "Gokulam Kerala vs Punjab FC",
      team1: { name: "Gokulam Kerala", goals: 0 },
      team2: { name: "Punjab FC", goals: 0 },
      status: "Today, 7:00 PM",
      sportType: "football",
      slug: "gokulam-vs-punjab-2024"
    },
    {
      matchType: "I-League",
      matchTitle: "Aizawl FC vs TRAU FC",
      team1: { name: "Aizawl FC", goals: 1 },
      team2: { name: "TRAU FC", goals: 1 },
      status: "45' - Half Time",
      sportType: "football",
      slug: "aizawl-vs-trau-2024",
      isLive: true
    },
    {
      matchType: "I-League",
      matchTitle: "Sreenidi Deccan vs Rajasthan United",
      team1: { name: "Sreenidi Deccan", goals: 0 },
      team2: { name: "Rajasthan United", goals: 0 },
      status: "Tomorrow, 4:30 PM",
      sportType: "football",
      slug: "sreenidi-vs-rajasthan-2024"
    },
    {
      matchType: "I-League",
      matchTitle: "Delhi FC vs Mohammedan SC",
      team1: { name: "Delhi FC", goals: 0 },
      team2: { name: "Mohammedan SC", goals: 0 },
      status: "Tomorrow, 7:00 PM",
      sportType: "football",
      slug: "delhi-vs-mohammedan-2024"
    }
  ],
  volleyball: [
    {
      matchType: "PVL",
      matchTitle: "Calicut Heroes vs Kochi Blue Spikers",
      team1: { name: "Calicut Heroes", points: 2 },
      team2: { name: "Kochi Blue Spikers", points: 3 },
      status: "Match Complete",
      sportType: "volleyball",
      slug: "calicut-vs-kochi-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Ahmedabad Defenders vs Hyderabad Black Hawks",
      team1: { name: "Ahmedabad Defenders", points: 2 },
      team2: { name: "Hyderabad Black Hawks", points: 1 },
      status: "3rd Set in progress",
      sportType: "volleyball",
      slug: "ahmedabad-vs-hyderabad-2024",
      isLive: true
    },
    {
      matchType: "PVL",
      matchTitle: "Chennai Blitz vs Bengaluru Torpedoes",
      team1: { name: "Chennai Blitz", points: 0 },
      team2: { name: "Bengaluru Torpedoes", points: 0 },
      status: "Today, 6:30 PM",
      sportType: "volleyball",
      slug: "chennai-vs-bengaluru-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Mumbai Meteors vs Kolkata Thunderbolts",
      team1: { name: "Mumbai Meteors", points: 3 },
      team2: { name: "Kolkata Thunderbolts", points: 1 },
      status: "Match Complete",
      sportType: "volleyball",
      slug: "mumbai-vs-kolkata-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Delhi Dynamos vs Pune Patriots",
      team1: { name: "Delhi Dynamos", points: 2 },
      team2: { name: "Pune Patriots", points: 2 },
      status: "Final Set",
      sportType: "volleyball",
      slug: "delhi-vs-pune-2024",
      isLive: true
    },
    {
      matchType: "PVL",
      matchTitle: "Calicut Heroes vs Ahmedabad Defenders",
      team1: { name: "Calicut Heroes", points: 0 },
      team2: { name: "Ahmedabad Defenders", points: 0 },
      status: "Tomorrow, 7:00 PM",
      sportType: "volleyball",
      slug: "calicut-vs-ahmedabad-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Kochi Blue Spikers vs Chennai Blitz",
      team1: { name: "Kochi Blue Spikers", points: 0 },
      team2: { name: "Chennai Blitz", points: 0 },
      status: "Tomorrow, 8:30 PM",
      sportType: "volleyball",
      slug: "kochi-vs-chennai-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Hyderabad Black Hawks vs Mumbai Meteors",
      team1: { name: "Hyderabad Black Hawks", points: 0 },
      team2: { name: "Mumbai Meteors", points: 0 },
      status: "Day After, 7:00 PM",
      sportType: "volleyball",
      slug: "hyderabad-vs-mumbai-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Bengaluru Torpedoes vs Delhi Dynamos",
      team1: { name: "Bengaluru Torpedoes", points: 0 },
      team2: { name: "Delhi Dynamos", points: 0 },
      status: "Day After, 8:30 PM",
      sportType: "volleyball",
      slug: "bengaluru-vs-delhi-2024"
    },
    {
      matchType: "PVL",
      matchTitle: "Kolkata Thunderbolts vs Pune Patriots",
      team1: { name: "Kolkata Thunderbolts", points: 0 },
      team2: { name: "Pune Patriots", points: 0 },
      status: "In 2 Days, 7:00 PM",
      sportType: "volleyball",
      slug: "kolkata-vs-pune-2024"
    }
  ]
};

const SportSection = ({ title, matches, isMobile }: { title: string, matches: any[], isMobile: boolean }) => {
  const showSwiper = matches.length > 3;

  const swiperProps = {
    modules: [Pagination, Navigation],
    spaceBetween: 24,
    slidesPerView: isMobile ? 1 : 3,
    pagination: { 
      clickable: true,
      dynamicBullets: true
    },
    navigation: !isMobile,
    loop: matches.length > (isMobile ? 1 : 3),
    centeredSlides: isMobile
  };

  return (
    <Box sx={{ mb: { xs: 6, sm: 8 } }}>
      <Box 
        sx={{ 
          position: 'relative',
          textAlign: 'center',
          mb: { xs: 3, sm: 4 },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            zIndex: 0
          }
        }}
      >
        <Typography 
          component="span"
          sx={{ 
            color: '#FFFFFF',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 500,
            letterSpacing: '0.1em',
            backgroundColor: '#0F1421',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
            textTransform: 'uppercase'
          }}
        >
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ 
        position: 'relative',
        '.swiper': { 
          pb: 4,
          overflow: 'hidden !important',
          px: { xs: 0, md: 5 } // Add padding for navigation buttons
        },
        '.swiper-pagination': {
          bottom: 0,
        },
        '.swiper-pagination-bullet': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          opacity: 0.5,
          '&-active': {
            backgroundColor: 'white',
            opacity: 1
          }
        },
        '.swiper-button-next, .swiper-button-prev': {
          color: 'rgba(255, 255, 255, 0.8)',
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '50%',
          '&:hover': {
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          },
          '&::after': {
            fontSize: '16px',
            fontWeight: 'bold'
          }
        },
        '.swiper-button-prev': {
          left: { xs: 4, md: 0 }
        },
        '.swiper-button-next': {
          right: { xs: 4, md: 0 }
        },
        // Add disabled state styling
        '.swiper-button-disabled': {
          opacity: '0.35 !important',
          cursor: 'not-allowed'
        }
      }}>
        {(isMobile || showSwiper) ? (
          <Swiper {...swiperProps}>
            {matches.map((match, index) => (
              <SwiperSlide key={index}>
                <Box sx={{ px: 1 }}>
                  <MatchCard {...match} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 2, sm: 3 }
          }}>
            {matches.map((match, index) => (
              <Box key={index}>
                <MatchCard {...match} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Matches = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Layout>
      <Box 
        sx={{ 
          backgroundColor: '#0F1421',
          minHeight: '100vh',
          pt: { xs: 3, sm: 4 }
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            px: { xs: 2, sm: 3 },
            pb: { xs: 6, sm: 8 }
          }}
        >
          <Box>
            <SportSection title="Cricket" matches={matchesByType.cricket} isMobile={isMobile} />
            <SportSection title="Kabaddi" matches={matchesByType.kabaddi} isMobile={isMobile} />
            <SportSection title="Football" matches={matchesByType.football} isMobile={isMobile} />
            <SportSection title="Volleyball" matches={matchesByType.volleyball} isMobile={isMobile} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Matches;
