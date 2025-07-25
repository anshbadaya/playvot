import React from "react";
import { Box, Typography } from "@mui/material";
import HighlightCard from "@/components/Match/HighlightsCard";

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
       
      {/* Horizontal scrollable flex row */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
          "&::-webkit-scrollbar-track": {
            background: "rgba(15, 23, 42, 0.3)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(29, 78, 216, 0.5)",
            borderRadius: "10px",
          },
        }}
      >
        {items.map((item, index) => (
          <Box key={index} sx={{ flex: "0 0 auto" }}>
            <HighlightCard {...item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HighlightsSection;