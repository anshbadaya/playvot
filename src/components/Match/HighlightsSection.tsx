import React from "react";
import { Box, Typography } from "@mui/material";
import HighlightCard from "@/components/Match/HighlightsCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

interface HighlightItem {
  title: string;
  category: string;
  image: string;
  views?: number;
  date?: string;
  slug?: string;
}

interface HighlightsSectionProps {
  sectionTitle: string;
  items: HighlightItem[];
}

const HighlightsSection: React.FC<HighlightsSectionProps> = ({ 
  sectionTitle, 
  items 
}) => {
  return (
    <Box mb={6}>
      <Typography 
        variant="h5" 
        fontWeight={700} 
        mb={1} 
        sx={{
          color: "rgba(255, 255, 255, 0.95)",
          background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.5px",
        }}
      >
        {sectionTitle}
      </Typography>
       
      {/* Swiper carousel with coverflow effect */}
      <Box sx={{ width: '100%', px: { xs: 0, sm: 4 }, mt: 3 }}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2.5,
            slideShadows: false,
          }}
          spaceBetween={-40}
          initialSlide={1}
          modules={[EffectCoverflow]}
          style={{ paddingBottom: 40, minHeight: 320 }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} style={{ width: 280, maxWidth: '90vw', zIndex: 2 }}>
              <HighlightCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HighlightsSection;