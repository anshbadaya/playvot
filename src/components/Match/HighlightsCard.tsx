// components/Highlights/HighlightCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";

interface HighlightCardProps {
  title: string;
  category: string;
  image: string;
  views?: number;
  date?: string;
  slug?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  category,
  image,
  views,
  date,
  slug,
}) => {
  return (
    <Link to={`/match/${slug}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: 260,
          backgroundColor: "#121212",
          borderRadius: 2,
          overflow: "hidden",
          color: "white",
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <CardMedia component="img" height="140" image={image} alt={title} />

        <CardContent sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: "#888" }}>
            {category.toUpperCase()}
          </Typography>

          <Typography variant="body2" fontWeight="bold" mt={0.5} noWrap>
            {title}
          </Typography>

          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {views !== undefined && (
              <Typography variant="caption" color="gray">
                👁️ {views}
              </Typography>
            )}
            {date && (
              <Typography variant="caption" color="gray">
                📅 {date}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HighlightCard;
