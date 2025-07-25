import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { StyledBackground } from "@/components/Shared/StyledBackground";

// Tab Panel Component
type TabPanelProps = {
  children: React.ReactNode;
  value: number;
  index: number;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return value === index ? <Box p={3}>{children}</Box> : null;
};

const MatchDetailPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <StyledBackground sx={{ color: "white", minHeight: "100vh", p: 3 }}>
      {/* Header Section */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Match: Shelar FC vs Poojary FC
        </Typography>
        <Typography variant="subtitle1" color="gray">
          Football | Jul 21, 2025 | 06:33 PM IST | Mumbai Turf
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1db954",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#17a44a" },
          }}
        >
          🎥 Watch Now
        </Button>
      </Box>

      {/* Tabs Section */}
      <Paper sx={{ backgroundColor: "#121212", borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Overview" />
          <Tab label="Stats" />
          <Tab label="Probability" />
          <Tab label="Predict & Bet" />
          <Tab label="Micro-Bets" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <Overview />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Stats />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Probability />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <PredictAndBet />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <MicroBets />
        </TabPanel>
      </Paper>
    </StyledBackground>
  );
};

export default MatchDetailPage;

// Dummy tab components
const Overview = () => <Typography>Score: 1-0 | Status: Live | League: Local Super League</Typography>;
const Stats = () => <Typography>Top Scorer: Player A | Shots: 12</Typography>;
const Probability = () => <Typography>Shelar FC: 65% | Poojary FC: 35%</Typography>;
const PredictAndBet = () => <Typography>Coming soon: Predict your winner!</Typography>;
const MicroBets = () => <Typography>Next goal by Player X? Bet ₹20 to win ₹60</Typography>;
