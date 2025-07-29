import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const formatScore = (team: TeamInfo, sport: string) => {
    switch (sport) {
      case 'cricket':
        return team.score + (team.overs ? ` (${team.overs})` : '');
      case 'football':
        return team.goals?.toString() || '0';
      case 'kabaddi':
        return team.points?.toString() || '0';
      case 'volleyball':
        return team.points?.toString() || '0';
      default:
        return team.score || '';
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        width: '100%',
        '&:hover': {
          '& .card-content': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0, 89, 255, 0.2)',
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
          background: 'linear-gradient(120deg, rgba(0, 89, 255, 0.2), rgba(0, 89, 255, 0.1) 25%, transparent 45%, transparent 55%, rgba(0, 89, 255, 0.1) 75%, rgba(0, 89, 255, 0.2))',
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
          backgroundColor: '#181B20',
          background: 'linear-gradient(180deg, rgba(0, 89, 255, 0.05) 0%, rgba(0, 89, 255, 0.02) 100%)',
          borderRadius: '12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          border: '1px solid rgba(0, 89, 255, 0.1)'
        }}
      >
        <CardContent sx={{ p: '16px !important' }}>
          {/* Match Type */}
          <Typography 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
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
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              fontWeight: 400,
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
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 1.5
            }}>
              <Typography 
                sx={{ 
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                {team1.name}
              </Typography>
              <Typography 
                sx={{ 
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                {formatScore(team1, sportType)}
              </Typography>
            </Box>

            {/* Team 2 */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between'
            }}>
              <Typography 
                sx={{ 
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                {team2.name}
              </Typography>
              <Typography 
                sx={{ 
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                {formatScore(team2, sportType)}
              </Typography>
            </Box>
          </Box>

          {/* Match Status */}
          <Typography 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '13px',
              fontWeight: 400
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