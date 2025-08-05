import { MatchesByType } from '@/types/match';

export const dummyMatchesData: MatchesByType = {
  cricket: [],
  kabaddi: [],
  football: [],
  volleyball: [],
  boxing: [
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
          weight_category: "60 KG MEN"
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
          weight_category: "65 KG MEN"
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
          weight_category: "70 KG MEN"
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
          weight_category: "75 KG MEN"
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
          weight_category: "80 KG MEN"
        }
      ]
    }
  ]
}; 