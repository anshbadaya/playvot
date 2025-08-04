import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { themeColors, commonStyles } from '@/config/theme';
import { sharedStyles } from '@/styles/shared.styles';
import { formatScore, SPORT_TYPES } from '@/utils';

interface TeamInfo {
  name: string;
  score?: string;
  overs?: string;  // For cricket matches (e.g., "20" or "19.2")
  goals?: number;   // For football matches
  points?: number;  // For kabaddi matches
}

interface MatchCardProps {
  matchType: string;      // e.g., "IPL", "PKL", "ISL"
  matchTitle: string;     // e.g., "Mumbai Indians vs Chennai Super Kings"
  team1: TeamInfo;
  team2: TeamInfo;
  status: string;        // e.g., "CSK won by 8 wickets", "Match in progress", "Today, 7:30 PM"
  isLive?: boolean;
  sportType: 'cricket' | 'football' | 'kabaddi' | 'volleyball';
  slug: string; // Add slug prop for navigation
}

const MatchCard: React.FC<MatchCardProps> = ({
  matchType,
  matchTitle,
  team1,
  team2,
  status,
  isLive = false,
  sportType,
  slug
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${slug}`);
  };

  // Function to format score based on sport type
  const getFormattedScore = (team: TeamInfo, sport: string) => {
    switch (sport) {
      case SPORT_TYPES.CRICKET:
        return formatScore(team.score, sport) + (team.overs ? ` (${team.overs})` : '');
      case SPORT_TYPES.FOOTBALL:
        return formatScore(team.goals, sport);
      case SPORT_TYPES.KABADDI:
      case SPORT_TYPES.VOLLEYBALL:
        return formatScore(team.points, sport);
      default:
        return formatScore(team.score, sport);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
          '& .card-content': {
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 20px ${themeColors.primaryLight}`,
          },
          '& .shine': {
            opacity: 1,
          }
        }
      }}
    >
      {/* Shining Border Effect */}
      <Box
        className="shine"
        sx={{
          position: 'absolute',
          inset: 0,
          padding: '1px',
          borderRadius: '12px',
          background: `linear-gradient(120deg, ${themeColors.primaryLight}, rgba(0, 89, 255, 0.1) 25%, transparent 45%, transparent 55%, rgba(0, 89, 255, 0.1) 75%, ${themeColors.primaryLight})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.8,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      <Card 
        className="card-content"
        sx={{ 
          width: '100%',
          background: `linear-gradient(180deg, ${themeColors.primaryLight} 0%, rgba(0, 89, 255, 0.02) 100%)`,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          ...commonStyles.card
        }}
      >
        <CardContent sx={{ p: '16px !important' }}>
          {/* Match Type */}
          <Typography 
            sx={{ 
              ...sharedStyles.caption,
              fontSize: '13px',
              fontWeight: 500,
              mb: 0.5,
              textTransform: 'uppercase'
            }}
          >
            {matchType}
          </Typography>

          {/* Match Title */}
          <Typography 
            sx={{ 
              ...sharedStyles.bodyText,
              fontSize: '14px',
              lineHeight: 1.4,
              mb: 2
            }}
          >
            {matchTitle}
          </Typography>

          {/* Teams Section */}
          <Box sx={{ mb: 2 }}>
            {/* Team 1 */}
            <Box sx={{ 
              ...sharedStyles.flexBetween,
              mb: 1.5
            }}>
              <Typography 
                sx={{ 
                  ...sharedStyles.heading,
                  fontSize: '15px',
                  letterSpacing: '0.5px'
                }}
              >
                {team1.name}
              </Typography>
              <Typography 
                sx={{ 
                  ...sharedStyles.heading,
                  fontSize: '15px',
                  letterSpacing: '0.5px'
                }}
              >
                {getFormattedScore(team1, sportType)}
              </Typography>
            </Box>

            {/* Team 2 */}
            <Box sx={{ 
              ...sharedStyles.flexBetween
            }}>
              <Typography 
                sx={{ 
                  ...sharedStyles.heading,
                  fontSize: '15px',
                  letterSpacing: '0.5px'
                }}
              >
                {team2.name}
              </Typography>
              <Typography 
                sx={{ 
                  ...sharedStyles.heading,
                  fontSize: '15px',
                  letterSpacing: '0.5px'
                }}
              >
                {getFormattedScore(team2, sportType)}
              </Typography>
            </Box>
          </Box>

          {/* Match Status */}
          <Typography 
            sx={{ 
              ...sharedStyles.caption,
              fontSize: '13px'
            }}
          >
            {status}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MatchCard; 