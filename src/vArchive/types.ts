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

export interface ArchiveTier {
  type: "vArchive";
  point: number;
  name: string;
  code: TierCode;
}

export interface LadderTier {
  type: "ladder";
  point: number;
  name: string;
  code: TierCode | "UNRANKED";
}

export interface RawTiers {
  button4: ArchiveTier | null;
  button5: ArchiveTier | null;
  button6: ArchiveTier | null;
  button8: ArchiveTier | null;
}

export interface UserInfo extends RawTiers {
  name: string;
  average: ArchiveTier;
  expected: LadderTier;
}
