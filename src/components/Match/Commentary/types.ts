import { MatchData } from '@/types/match-details';

export interface OverData {
  overNumber: number;
  runs: number;
  balls: (number | 'W')[];
}

export interface CommentaryProps {
  data: MatchData;
  oversData?: OverData[];
}

export interface CommentaryItemProps {
  comment: {
    time: string;
    text: string;
    type: 'wicket' | 'boundary' | 'over' | 'normal';
    team: 'home' | 'away';
  };
  index: number;
}

export interface OverByOverViewProps {
  oversData: OverData[];
} 