export interface HighlightItemProps {
  title: string;
  description: string;
  timestamp: string;
  type: 'boundary' | 'wicket' | 'milestone' | 'other';
  team: 'home' | 'away';
}

export interface HighlightsCardProps {
  highlights: HighlightItemProps[];
  title?: string;
}

export interface HighlightsSectionProps {
  children: React.ReactNode;
  title: string;
}

export interface HighlightsTabProps {
  highlights: HighlightItemProps[];
} 