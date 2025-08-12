import { MatchesByType } from '@/types/match';

export const dummyMatchesData: MatchesByType = {
  cricket: [
    {
      id: "cricket-1",
      matchType: "T20",
      matchTitle: "Mumbai Indians vs Chennai Super Kings",
      team1: {
        name: "Mumbai Indians",
        score: "156/4",
        overs: "18.2"
      },
      team2: {
        name: "Chennai Super Kings",
        score: "142/6",
        overs: "20.0"
      },
      status: "Live",
      sportType: "cricket",
      slug: "mi-vs-csk-live",
      isLive: true,
      venue: "Wankhede Stadium, Mumbai",
      dateTime: "2025-01-15T19:30:00Z",
      league: "IPL 2025"
    },
    {
      id: "cricket-2",
      matchType: "ODI",
      matchTitle: "India vs Australia",
      team1: {
        name: "India",
        score: "285/7",
        overs: "45.3"
      },
      team2: {
        name: "Australia",
        score: "198/4",
        overs: "32.1"
      },
      status: "Live",
      sportType: "cricket",
      slug: "ind-vs-aus-live",
      isLive: true,
      venue: "MCG, Melbourne",
      dateTime: "2025-01-15T14:00:00Z",
      league: "ICC World Cup"
    }
  ],
  football: [
    {
      id: "football-1",
      matchType: "League",
      matchTitle: "Manchester United vs Liverpool",
      team1: {
        name: "Manchester United",
        goals: 2
      },
      team2: {
        name: "Liverpool",
        goals: 1
      },
      status: "Live - 75'",
      sportType: "football",
      slug: "man-utd-vs-liverpool-live",
      isLive: true,
      venue: "Old Trafford",
      dateTime: "2025-01-15T20:00:00Z",
      league: "Premier League"
    },
    {
      id: "football-2",
      matchType: "Champions League",
      matchTitle: "Real Madrid vs Barcelona",
      team1: {
        name: "Real Madrid",
        goals: 0
      },
      team2: {
        name: "Barcelona",
        goals: 0
      },
      status: "Live - 23'",
      sportType: "football",
      slug: "real-madrid-vs-barcelona-live",
      isLive: true,
      venue: "Santiago Bernabéu",
      dateTime: "2025-01-15T21:30:00Z",
      league: "UEFA Champions League"
    }
  ],
  kabaddi: [
    {
      id: "kabaddi-1",
      matchType: "Pro Kabaddi",
      matchTitle: "Patna Pirates vs Bengal Warriors",
      team1: {
        name: "Patna Pirates",
        points: 32
      },
      team2: {
        name: "Bengal Warriors",
        points: 28
      },
      status: "Live - Q4",
      sportType: "kabaddi",
      slug: "patna-vs-bengal-live",
      isLive: true,
      venue: "Patliputra Sports Complex",
      dateTime: "2025-01-15T19:00:00Z",
      league: "Pro Kabaddi League"
    },
    {
      id: "kabaddi-2",
      matchType: "Pro Kabaddi",
      matchTitle: "Dabang Delhi vs U Mumba",
      team1: {
        name: "Dabang Delhi",
        points: 25
      },
      team2: {
        name: "U Mumba",
        points: 30
      },
      status: "Live - Q3",
      sportType: "kabaddi",
      slug: "delhi-vs-mumbai-live",
      isLive: true,
      venue: "Thyagaraj Sports Complex",
      dateTime: "2025-01-15T20:30:00Z",
      league: "Pro Kabaddi League"
    }
  ],
  volleyball: [
    {
      id: "volleyball-1",
      matchType: "League",
      matchTitle: "Ahmedabad Defenders vs Kolkata Thunderbolts",
      team1: {
        name: "Ahmedabad Defenders",
        points: 2
      },
      team2: {
        name: "Kolkata Thunderbolts",
        points: 1
      },
      status: "Live - Set 4",
      sportType: "volleyball",
      slug: "ahmedabad-vs-kolkata-live",
      isLive: true,
      venue: "TransStadia Arena",
      dateTime: "2025-01-15T18:00:00Z",
      league: "Prime Volleyball League"
    },
    {
      id: "volleyball-2",
      matchType: "League",
      matchTitle: "Chennai Blitz vs Hyderabad Black Hawks",
      team1: {
        name: "Chennai Blitz",
        points: 1
      },
      team2: {
        name: "Hyderabad Black Hawks",
        points: 2
      },
      status: "Live - Set 5",
      sportType: "volleyball",
      slug: "chennai-vs-hyderabad-live",
      isLive: true,
      venue: "JLN Indoor Stadium",
      dateTime: "2025-01-15T19:15:00Z",
      league: "Prime Volleyball League"
    }
  ],
  sports: [
    {
      card: "MAIN CARD",
      fixture_no: 1,
      match_date: "2025-01-15",
      matches: [
        {
          match_no: 1,
          player_a: {
            code: 1091,
            name: "Ashish Mehta",
            team: "MUMBAI MUSCLE"
          },
          player_b: {
            code: 1002,
            name: "Akash Handique",
            team: "MP HATHODAS"
          },
          pre_match_odds: {
            a: 1.61,
            b: 2.33
          },
          live_match_odds: {
            a: 1.45,
            b: 2.85
          },
          weight_category: "60 KG MEN",
          start_time: "18:10:00",
          end_time: "18:50:00",
          isLive: true
        },
        {
          match_no: 2,
          player_a: {
            code: 1093,
            name: "Vijay Kumar",
            team: "DELHI DYNAMOS"
          },
          player_b: {
            code: 1004,
            name: "Rahul Singh",
            team: "PUNJAB PANTHERS"
          },
          pre_match_odds: {
            a: 1.85,
            b: 1.95
          },
          live_match_odds: {
            a: 1.72,
            b: 2.15
          },
          weight_category: "65 KG MEN",
          start_time: "19:00:00",
          end_time: "19:40:00",
          isLive: true
        }
      ]
    },
    {
      card: "UNDER CARD",
      fixture_no: 2,
      match_date: "2025-01-15",
      matches: [
        {
          match_no: 3,
          player_a: {
            code: 1095,
            name: "Ravi Kumar",
            team: "CHENNAI CHAMPIONS"
          },
          player_b: {
            code: 1006,
            name: "Sanjay Verma",
            team: "KOLKATA KINGS"
          },
          pre_match_odds: {
            a: 2.10,
            b: 1.75
          },
          live_match_odds: {
            a: 1.95,
            b: 1.88
          },
          weight_category: "70 KG MEN",
          start_time: "20:00:00",
          end_time: "20:40:00",
          isLive: true
        },
        {
          match_no: 4,
          player_a: {
            code: 1097,
            name: "Ankit Sharma",
            team: "BANGALORE BULLS"
          },
          player_b: {
            code: 1008,
            name: "Deepak Chahar",
            team: "HYDERABAD HEROES"
          },
          pre_match_odds: {
            a: 1.65,
            b: 2.25
          },
          live_match_odds: {
            a: 1.58,
            b: 2.42
          },
          weight_category: "75 KG MEN",
          start_time: "21:00:00",
          end_time: "21:40:00",
          isLive: true
        }
      ]
    }
  ]
};

// Separate data for upcoming matches (no live odds)
export const dummyUpcomingMatchesData: MatchesByType = {
  cricket: [
    {
      id: "cricket-upcoming-1",
      matchType: "Test",
      matchTitle: "England vs South Africa",
      team1: {
        name: "England"
      },
      team2: {
        name: "South Africa"
      },
      status: "Upcoming",
      sportType: "cricket",
      slug: "eng-vs-sa-upcoming",
      isLive: false,
      venue: "Lord's Cricket Ground",
      dateTime: "2025-01-16T10:00:00Z",
      league: "Test Series"
    }
  ],
  football: [
    {
      id: "football-upcoming-1",
      matchType: "League",
      matchTitle: "Arsenal vs Chelsea",
      team1: {
        name: "Arsenal"
      },
      team2: {
        name: "Chelsea"
      },
      status: "Upcoming",
      sportType: "football",
      slug: "arsenal-vs-chelsea-upcoming",
      isLive: false,
      venue: "Emirates Stadium",
      dateTime: "2025-01-16T19:45:00Z",
      league: "Premier League"
    }
  ],
  kabaddi: [
    {
      id: "kabaddi-upcoming-1",
      matchType: "Pro Kabaddi",
      matchTitle: "Gujarat Giants vs Haryana Steelers",
      team1: {
        name: "Gujarat Giants"
      },
      team2: {
        name: "Haryana Steelers"
      },
      status: "Upcoming",
      sportType: "kabaddi",
      slug: "gujarat-vs-haryana-upcoming",
      isLive: false,
      venue: "EKA Arena",
      dateTime: "2025-01-16T19:00:00Z",
      league: "Pro Kabaddi League"
    }
  ],
  volleyball: [
    {
      id: "volleyball-upcoming-1",
      matchType: "League",
      matchTitle: "Mumbai Meteors vs Calicut Heroes",
      team1: {
        name: "Mumbai Meteors"
      },
      team2: {
        name: "Calicut Heroes"
      },
      status: "Upcoming",
      sportType: "volleyball",
      slug: "mumbai-vs-calicut-upcoming",
      isLive: false,
      venue: "NSCI Dome",
      dateTime: "2025-01-16T18:00:00Z",
      league: "Prime Volleyball League"
    }
  ],
  sports: [
    {
      card: "MAIN CARD",
      fixture_no: 3,
      match_date: "2025-01-16",
      matches: [
        {
          match_no: 6,
          player_a: {
            code: 1101,
            name: "Prakash Kumar",
            team: "UTTAR PRADESH"
          },
          player_b: {
            code: 1012,
            name: "Rajesh Singh",
            team: "BIHAR BOXERS"
          },
          pre_match_odds: {
            a: 1.75,
            b: 2.10
          },
          weight_category: "55 KG MEN",
          start_time: "18:30:00",
          end_time: "19:10:00"
        },
        {
          match_no: 7,
          player_a: {
            code: 1103,
            name: "Amit Patel",
            team: "MAHARASHTRA"
          },
          player_b: {
            code: 1014,
            name: "Suresh Kumar",
            team: "KARNATAKA"
          },
          pre_match_odds: {
            a: 2.20,
            b: 1.65
          },
          weight_category: "85 KG MEN",
          start_time: "19:30:00",
          end_time: "20:10:00"
        }
      ]
    },
    {
      card: "UNDER CARD",
      fixture_no: 4,
      match_date: "2025-01-16",
      matches: [
        {
          match_no: 8,
          player_a: {
            code: 1105,
            name: "Mohan Das",
            team: "WEST BENGAL"
          },
          player_b: {
            code: 1016,
            name: "Vikram Singh",
            team: "ODISHA"
          },
          pre_match_odds: {
            a: 1.95,
            b: 1.85
          },
          weight_category: "90 KG MEN",
          start_time: "20:30:00",
          end_time: "21:10:00"
        },
        {
          match_no: 9,
          player_a: {
            code: 1126,
            name: "Deepanker Mech",
            team: "ROHTAK ROWDIES"
          },
          player_b: {
            code: 1155,
            name: "Sanu Joy",
            team: "SHER-E-LUDHIANA"
          },
          pre_match_odds: {
            a: 1.1,
            b: 6.9
          },
          weight_category: "70 KG MEN",
          start_time: "18:10:00",
          end_time: "18:50:00"
        }
      ]
    }
  ]
}; 