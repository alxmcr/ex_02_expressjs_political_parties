export interface PoliticalParty {
  id: number;
  name: string;
  abbreviation: string;
  founded_date: string;
  ideology: string[];
  leader: string;
  headquarters: string;
  website: string;
  number_of_members: number;
  ballot_status: string;
  presidential_candidate: string;
  vice_presidential_candidate: string;
}
