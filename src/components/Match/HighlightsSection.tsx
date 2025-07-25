// components/Highlights/HighlightsSection.tsx
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

const HighlightsSection: React.FC<HighlightsSectionProps> = ({ sectionTitle, items }) => {
  return (
    <Box mb={6}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="white">
        {sectionTitle}
      </Typography>

      {/* Horizontal scrollable flex row */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
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
