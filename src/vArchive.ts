import { useEffect, useState } from "react";

export type TierCode = "GM" | "M" | "DM" | "PT" | "GD" | "SV" | "BR" | "AM";

export interface TierData {
  point: number;
  name: string;
  code: TierCode;
}

export interface UserInfo {
  button4: TierData;
  button5: TierData;
  button6: TierData;
  button8: TierData;
}

function sanitizeResponse(res: any): TierData {
  return {
    point: res.tierPoint,
    name: res.tier.name,
    code: res.tier.code,
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

export function useUserInfo(userName: string) {
  const [data, setData] = useState<UserInfo | null>(null);

  useEffect(() => {
    getUserInfo(userName).then(setData);
  }, [userName]);

  return data;
}
