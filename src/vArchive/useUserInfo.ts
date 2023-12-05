import { useEffect, useState } from "react";
import { ArchiveTier, LadderTier, UserInfo } from "./types";
import { expectationTable, getTierFromPoint } from "./tierData";

function sanitizeResponse(res: any): ArchiveTier | null {
  if (!res.success) {
    return null;
  }

  return {
    type: "vArchive",
    point: res.tierPoint,
    name: res.tier.name,
    code: res.tier.code,
  };
}

function getAverageTier(tiers: (ArchiveTier | null)[]): ArchiveTier {
  const filtered = tiers.filter((tier) => !!tier) as ArchiveTier[];
  const sum = filtered.reduce((sum, tier) => sum + tier.point, 0);
  const average = sum / filtered.length;

  return {
    type: "vArchive",
    ...getTierFromPoint(average),
    point: average,
  };
}

function getExpectedTier(tiers: (ArchiveTier | null)[]): LadderTier {
  const sortedTiers = tiers
    .filter((tier) => !!tier)
    .sort((a, b) => b!.point - a!.point) as ArchiveTier[];

  const matchedLadderTier = expectationTable.find(
    ({ requiredButtons, requiredPoint }) => {
      if (sortedTiers.length < requiredButtons) {
        return false;
      }

      const topTiers = sortedTiers.slice(0, requiredButtons);
      const sum = topTiers.reduce((sum, tier) => sum + tier.point, 0);
      const average = sum / requiredButtons;

      return average >= requiredPoint;
    }
  );

  if (matchedLadderTier) {
    return {
      type: "ladder",
      name: matchedLadderTier.tierName,
      code: matchedLadderTier.tierCode,
      point: ["Diamond I", "Platinum I", "Gold I"].includes(
        matchedLadderTier.tierName
      )
        ? 50
        : 0,
    };
  }

  return {
    type: "ladder",
    name: "UNRANKED",
    code: "UNRANKED",
    point: 0,
  };
}

export async function getUserInfo(userName: string) {
  const button4 = fetch(
    `https://v-archive.net/api/archive/${encodeURIComponent(userName)}/tier/4`
  )
    .then((res) => res.json())
    .then(sanitizeResponse);
  const button5 = fetch(
    `https://v-archive.net/api/archive/${encodeURIComponent(userName)}/tier/5`
  )
    .then((res) => res.json())
    .then(sanitizeResponse);
  const button6 = fetch(
    `https://v-archive.net/api/archive/${encodeURIComponent(userName)}/tier/6`
  )
    .then((res) => res.json())
    .then(sanitizeResponse);
  const button8 = fetch(
    `https://v-archive.net/api/archive/${encodeURIComponent(userName)}/tier/8`
  )
    .then((res) => res.json())
    .then(sanitizeResponse);

  return Promise.all([button4, button5, button6, button8]).then(
    ([b4, b5, b6, b8]) => ({
      button4: b4,
      button5: b5,
      button6: b6,
      button8: b8,
    })
  );
}

export function useUserInfo(
  userName: string,
  selectedButtons: Record<
    "button4" | "button5" | "button6" | "button8",
    boolean
  >
) {
  const [data, setData] = useState<UserInfo | null>(null);

  useEffect(() => {
    getUserInfo(userName).then(setData);
  }, [userName]);

  return data
    ? {
        button4: selectedButtons.button4 ? data.button4 : null,
        button5: selectedButtons.button5 ? data.button5 : null,
        button6: selectedButtons.button6 ? data.button6 : null,
        button8: selectedButtons.button8 ? data.button8 : null,
        average: getAverageTier([
          selectedButtons.button4 ? data.button4 : null,
          selectedButtons.button5 ? data.button5 : null,
          selectedButtons.button6 ? data.button6 : null,
          selectedButtons.button8 ? data.button8 : null,
        ]),
        expected: getExpectedTier([
          selectedButtons.button4 ? data.button4 : null,
          selectedButtons.button5 ? data.button5 : null,
          selectedButtons.button6 ? data.button6 : null,
          selectedButtons.button8 ? data.button8 : null,
        ]),
      }
    : null;
}
