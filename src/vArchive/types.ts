export type TierCode =
  | "GM"
  | "M"
  | "DM"
  | "PT"
  | "GD"
  | "SV"
  | "BR"
  | "IR"
  | "AM"
  | "BG";

export interface Tier {
  point: number;
  name: string;
  code: TierCode;
}

export interface UserInfo {
  button4: Tier;
  button5: Tier;
  button6: Tier;
  button8: Tier;
  average: Tier;
}
