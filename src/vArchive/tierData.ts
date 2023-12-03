import { Tier } from "./types";

export const tierData: Array<{ rating: number } & Pick<Tier, "name" | "code">> =
  [
    { rating: 9950, name: "Grand Master", code: "GM" },
    { rating: 9900, name: "Master I", code: "M" },
    { rating: 9800, name: "Master II", code: "M" },
    { rating: 9700, name: "Master III", code: "M" },
    { rating: 9600, name: "Diamond I", code: "DM" },
    { rating: 9400, name: "Diamond II", code: "DM" },
    { rating: 9200, name: "Diamond III", code: "DM" },
    { rating: 9000, name: "Diamond IV", code: "DM" },
    { rating: 8800, name: "Platinum I", code: "PT" },
    { rating: 8600, name: "Platinum II", code: "PT" },
    { rating: 8400, name: "Platinum III", code: "PT" },
    { rating: 8200, name: "Platinum IV", code: "PT" },
    { rating: 8000, name: "Gold I", code: "GD" },
    { rating: 7800, name: "Gold II", code: "GD" },
    { rating: 7600, name: "Gold III", code: "GD" },
    { rating: 7400, name: "Gold IV", code: "GD" },
    { rating: 7200, name: "Silver I", code: "SV" },
    { rating: 7000, name: "Silver II", code: "SV" },
    { rating: 6800, name: "Silver III", code: "SV" },
    { rating: 6600, name: "Silver IV", code: "SV" },
    { rating: 6300, name: "Bronze I", code: "BR" },
    { rating: 6000, name: "Bronze II", code: "BR" },
    { rating: 5650, name: "Bronze III", code: "BR" },
    { rating: 5300, name: "Bronze IV", code: "BR" },
    { rating: 4900, name: "Iron I", code: "IR" },
    { rating: 4600, name: "Iron II", code: "IR" },
    { rating: 4300, name: "Iron III", code: "IR" },
    { rating: 4000, name: "Iron IV", code: "IR" },
    { rating: 3000, name: "Amateur I", code: "AM" },
    { rating: 2000, name: "Amateur II", code: "AM" },
    { rating: 1000, name: "Amateur III", code: "AM" },
    { rating: 500, name: "Amateur IV", code: "AM" },
    { rating: 0, name: "Beginner", code: "BG" },
  ];

export function getTierFromPoint(point: number): Pick<Tier, "name" | "code"> {
  const tier = tierData.find((tier) => tier.rating <= point);
  if (!tier) {
    throw new Error(`Invalid point: ${point}`);
  }
  return tier;
}
