export interface PoliticalParty {
  id: number;
  name: string;
  abbreviation: string;
  founded_date: string; // still a string if coming from JSON, though it's a Date in DB
  leader: string;
  headquarters: string;
  website: string;
  number_of_members: number;
  ballot_status: string;
  presidential_candidate: string;
  vice_presidential_candidate: string;
  created_at: string; // ISO timestamp string
  updated_at: string; // ISO timestamp string
}
