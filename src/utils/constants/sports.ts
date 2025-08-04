// Sports constants
export const SPORT_TYPES = {
  CRICKET: 'cricket',
  FOOTBALL: 'football',
  KABADDI: 'kabaddi',
  VOLLEYBALL: 'volleyball',
  TENNIS: 'tennis',
  BASKETBALL: 'basketball'
} as const;

export const MATCH_STATUS = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed'
} as const;

export const MATCH_TYPES = {
  T20: 'T20',
  ODI: 'ODI',
  TEST: 'Test',
  LEAGUE: 'League',
  FRIENDLY: 'Friendly',
  TOURNAMENT: 'Tournament'
} as const;

export const TEAM_TYPES = {
  NATIONAL: 'national',
  CLUB: 'club',
  FRANCHISE: 'franchise'
} as const;

export const PLAYER_ROLES = {
  BATSMAN: 'batsman',
  BOWLER: 'bowler',
  ALL_ROUNDER: 'all_rounder',
  WICKET_KEEPER: 'wicket_keeper',
  CAPTAIN: 'captain',
  VICE_CAPTAIN: 'vice_captain'
} as const;

export const BOWLING_TYPES = {
  FAST: 'fast',
  MEDIUM: 'medium',
  SPIN: 'spin',
  LEG_SPIN: 'leg_spin',
  OFF_SPIN: 'off_spin'
} as const;

export const DISMISSAL_TYPES = {
  BOWLED: 'bowled',
  CAUGHT: 'caught',
  LBW: 'lbw',
  RUN_OUT: 'run_out',
  STUMPED: 'stumped',
  HIT_WICKET: 'hit_wicket',
  OBSTRUCTING: 'obstructing',
  HANDLED_BALL: 'handled_ball',
  TIMED_OUT: 'timed_out',
  RETIRED_OUT: 'retired_out',
  RETIRED_HURT: 'retired_hurt',
  HIT_THE_BALL_TWICE: 'hit_the_ball_twice'
} as const; 