export interface PoliticalParty {
  id: number;
  name: string;
  abbreviation: string;
  presidential_candidate: string;
  vice_presidential_candidate: string;
  created_at: string; // ISO timestamp string
  updated_at: string; // ISO timestamp string
}

export interface PoliticalPartyDataNew {
  name: string;
  abbreviation: string;
  presidential_candidate: string;
  vice_presidential_candidate: string;
}

export interface PoliticalPartyDataEdit {
  name: string;
  abbreviation: string;
  presidential_candidate: string;
  vice_presidential_candidate: string;
}
