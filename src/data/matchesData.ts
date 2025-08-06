import { MatchesByType } from '@/types/match';

export const dummyMatchesData: MatchesByType = {
  cricket: [],
  kabaddi: [],
  football: [],
  volleyball: [],
  sports: [
    {
      card: "MAIN CARD",
      fixture_no: 1,
      match_date: "2025-08-05",
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
          end_time: "18:50:00"
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
          end_time: "19:40:00"
        }
      ]
    },
    {
      card: "UNDER CARD",
      fixture_no: 2,
      match_date: "2025-08-05",
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
          end_time: "20:40:00"
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
          end_time: "21:40:00"
        },
        {
          match_no: 5,
          player_a: {
            code: 1099,
            name: "Sunil Yadav",
            team: "RAJASTHAN ROYALS"
          },
          player_b: {
            code: 1010,
            name: "Manish Patel",
            team: "GUJARAT GIANTS"
          },
          pre_match_odds: {
            a: 1.90,
            b: 1.90
          },
          live_match_odds: {
            a: 1.82,
            b: 2.05
          },
          weight_category: "80 KG MEN",
          start_time: "22:00:00",
          end_time: "22:40:00"
        }
      ]
    }
  ]
};

// Separate data for upcoming matches (no live odds)
export const dummyUpcomingMatchesData: MatchesByType = {
  cricket: [],
  kabaddi: [],
  football: [],
  volleyball: [],
  sports: [
    {
      card: "MAIN CARD",
      fixture_no: 3,
      match_date: "2025-08-06",
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
      match_date: "2025-08-06",
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