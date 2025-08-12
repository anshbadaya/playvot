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
import { styled } from "@mui/material/styles";

interface HighlightCardProps {
  title: string;
  category: string;
  image: string;
  views?: number;
  date?: string;
  slug?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: 280,
  background: "rgba(15, 23, 42, 0.5)",
  border: "1px solid rgba(100, 116, 139, 0.3)",
  borderRadius: "16px",
  overflow: "hidden",
  color: "rgba(255, 255, 255, 0.9)",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  transition: "all 0.4s cubic-bezier(.4,2,.3,1)",
  position: "relative",
  boxShadow: '0 2px 12px rgba(29, 78, 216, 0.10)',
  '&.swiper-slide-active': {
    transform: 'scale(1.08) translateY(-10px)',
    zIndex: 3,
    boxShadow: '0 8px 32px 0 rgba(29, 78, 216, 0.25)',
    background: 'rgba(29, 78, 216, 0.18)',
    borderColor: 'rgba(29, 78, 216, 0.7)',
  },
  '&.swiper-slide-next, &.swiper-slide-prev': {
    transform: 'scale(0.92) translateY(10px)',
    opacity: 0.85,
    zIndex: 2,
    boxShadow: '0 2px 12px rgba(29, 78, 216, 0.10)',
  },
  '&:not(.swiper-slide-active)': {
    filter: 'blur(0.5px)',
  },
  '&.swiper-slide': {
    transition: 'all 0.4s cubic-bezier(.4,2,.3,1)',
  },
  '&:hover': {
    transform: 'scale(1.10) translateY(-14px)',
    background: 'rgba(29, 78, 216, 0.22)',
    borderColor: 'rgba(29, 78, 216, 0.9)',
    boxShadow: `0 12px 32px rgba(29, 78, 216, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
  },
  '&::before': {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 50% 0%, rgba(29, 78, 216, 0.1) 0%, transparent 50%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  },
  '&:hover::before': {
    opacity: 1,
  },
  [theme.breakpoints.down("sm")]: {
    width: 260,
  }
}));

const CategoryChip = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  background: "rgba(29, 78, 216, 0.2)",
  color: "rgba(29, 78, 216, 0.9)",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "1px",
  textTransform: "uppercase",
  border: "1px solid rgba(29, 78, 216, 0.3)",
  marginBottom: theme.spacing(1),
}));

const ViewsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  color: "rgba(100, 116, 139, 0.8)",
  fontSize: "11px",
  fontWeight: 500,
}));

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
      <StyledCard>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia 
            component="img" 
            height="160" 
            image={image} 
            alt={title}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              }
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.3) 100%)",
            }}
          />
        </Box>

        <CardContent sx={{ p: 3 }}>
          <CategoryChip variant="caption">
            {category}
          </CategoryChip>
           
          <Typography 
            variant="body1" 
            fontWeight={700} 
            sx={{ 
              color: "rgba(255, 255, 255, 0.95)",
              lineHeight: 1.4,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
           
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
            justifyContent="space-between"
          >
            {views !== undefined && (
              <ViewsContainer>
                <Box
                  component="span"
                  sx={{
                    width: "12px",
                    height: "12px",
                    background: "rgba(29, 78, 216, 0.3)",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                {views.toLocaleString()}
              </ViewsContainer>
            )}
            {date && (
              <ViewsContainer>
                <Box
                  component="span"
                  sx={{
                    width: "12px",
                    height: "12px",
                    background: "rgba(16, 185, 129, 0.3)",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                {date}
              </ViewsContainer>
            )}
          </Stack>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default HighlightCard;