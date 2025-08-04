import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '@/config/theme';
import { sharedStyles } from '@/styles/shared.styles';
import { formatScore, SPORT_TYPES } from '@/utils';
import { MatchCardProps, TeamInfo } from '@/types/match';
import {
  matchCardContainerStyles,
  matchCardShineStyles,
  matchCardStyles,
  matchCardContentStyles,
  matchTypeStyles,
  matchTitleStyles,
  teamsSectionStyles,
  teamRowStyles,
  teamNameStyles,
  matchStatusStyles
} from '@/styles/matches.styles';

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
    <Box onClick={handleClick} sx={matchCardContainerStyles}>
      {/* Shining Border Effect */}
      <Box className="shine" sx={matchCardShineStyles} />
      
      <Card className="card-content" sx={{ ...matchCardStyles, ...commonStyles.card }}>
        <CardContent sx={matchCardContentStyles}>
          {/* Match Type */}
          <Typography sx={{ ...sharedStyles.caption, ...matchTypeStyles }}>
            {matchType}
          </Typography>

          {/* Match Title */}
          <Typography sx={{ ...sharedStyles.bodyText, ...matchTitleStyles }}>
            {matchTitle}
          </Typography>

          {/* Teams Section */}
          <Box sx={teamsSectionStyles}>
            {/* Team 1 */}
            <Box sx={{ ...sharedStyles.flexBetween, ...teamRowStyles }}>
              <Typography sx={{ ...sharedStyles.heading, ...teamNameStyles }}>
                {team1.name}
              </Typography>
              <Typography sx={{ ...sharedStyles.heading, ...teamNameStyles }}>
                {getFormattedScore(team1, sportType)}
              </Typography>
            </Box>

            {/* Team 2 */}
            <Box sx={sharedStyles.flexBetween}>
              <Typography sx={{ ...sharedStyles.heading, ...teamNameStyles }}>
                {team2.name}
              </Typography>
              <Typography sx={{ ...sharedStyles.heading, ...teamNameStyles }}>
                {getFormattedScore(team2, sportType)}
              </Typography>
            </Box>
          </Box>

          {/* Match Status */}
          <Typography sx={{ ...sharedStyles.caption, ...matchStatusStyles }}>
            {status}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MatchCard; 