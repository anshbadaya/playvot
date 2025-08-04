import { MatchData, ScorecardData, MatchDetailsResponse, Commentary, BettingOdds, WinProbability } from '@/types/match-details';
import { dummyMatchData, dummyScorecardData } from '@/data/matchDetailsData';

// API base URL - replace with your actual API endpoint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.playvot.com';

/**
 * Fetch match details by match ID
 * @param matchId - The unique identifier for the match
 * @returns Promise<MatchDetailsResponse>
 */
export const fetchMatchDetails = async (matchId: string): Promise<MatchDetailsResponse> => {
  try {
    // In a real application, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/matches/${matchId}`);
    // const data = await response.json();
    
    // For now, we'll use dummy data with a delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      data: dummyMatchData,
      scorecard: dummyScorecardData,
      success: true
    };
  } catch (error) {
    // console.error('Error fetching match details:', error);
    return {
      data: {} as MatchData,
      scorecard: undefined,
      success: false,
      message: 'Failed to fetch match details'
    };
  }
};

/**
 * Fetch match data only (without scorecard)
 * @param matchId - The unique identifier for the match
 * @returns Promise<MatchData>
 */
export const fetchMatchData = async (matchId: string): Promise<MatchData> => {
  try {
    const response = await fetchMatchDetails(matchId);
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch match data');
    }
  } catch (error) {
    // console.error('Error fetching match data:', error);
    throw error;
  }
};

/**
 * Fetch scorecard data only
 * @param matchId - The unique identifier for the match
 * @returns Promise<ScorecardData | undefined>
 */
export const fetchScorecardData = async (matchId: string): Promise<ScorecardData | undefined> => {
  try {
    const response = await fetchMatchDetails(matchId);
    
    if (response.success && response.scorecard) {
      return response.scorecard;
    } else {
      return undefined;
    }
  } catch (error) {
    // console.error('Error fetching scorecard data:', error);
    return undefined;
  }
};

/**
 * Fetch live commentary updates
 * @param matchId - The unique identifier for the match
 * @param lastUpdateTime - Timestamp of last update
 * @returns Promise<Commentary[]>
 */
export const fetchLiveCommentary = async (
  matchId: string, 
  lastUpdateTime?: string
): Promise<Commentary[]> => {
  try {
    // In a real application, this would be a WebSocket or polling call
    // const response = await fetch(`${API_BASE_URL}/matches/${matchId}/commentary?since=${lastUpdateTime}`);
    // const data = await response.json();
    
    // For now, return empty array (no new commentary)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [];
  } catch (error) {
    // console.error('Error fetching live commentary:', error);
    return [];
  }
};

/**
 * Fetch betting odds updates
 * @param matchId - The unique identifier for the match
 * @returns Promise<BettingOdds>
 */
export const fetchBettingOdds = async (matchId: string): Promise<BettingOdds> => {
  try {
    // In a real application, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/matches/${matchId}/odds`);
    // const data = await response.json();
    
    // For now, return dummy odds
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      home: 2.1,
      draw: 3.5,
      away: 3.8
    };
  } catch (error) {
    // console.error('Error fetching betting odds:', error);
    throw error;
  }
};

/**
 * Fetch win probability updates
 * @param matchId - The unique identifier for the match
 * @returns Promise<WinProbability>
 */
export const fetchWinProbability = async (matchId: string): Promise<WinProbability> => {
  try {
    // In a real application, this would be an API call
    // const response = await fetch(`${API_BASE_URL}/matches/${matchId}/probability`);
    // const data = await response.json();
    
    // For now, return dummy probability
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      home: 28,
      away: 38
    };
  } catch (error) {
    // console.error('Error fetching win probability:', error);
    throw error;
  }
}; 