export interface FollowerSurveyData {
  twitter?: string;
  fave_chara: string;
  fave_unit: string;
  assumed_chara: string;
  assumed_unit: string;
}

export interface CountedVotes {
  chara_id: number;
  count: number;
}

export type FollowerSurveyDataType =
  | "fave_chara"
  | "fave_unit"
  | "assumed_chara"
  | "assumed_unit";
