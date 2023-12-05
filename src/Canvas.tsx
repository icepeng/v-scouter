import { memo, useEffect, useRef } from "react";
import { ArchiveTier, LadderTier, UserInfo } from "./vArchive/types";
import * as assets from "./assets";

async function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
}

function drawTextWithSpacing(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number
) {
  let currentPosition = x;

  for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], currentPosition, y);
    currentPosition += ctx.measureText(text[i]).width + spacing;
  }

  return currentPosition;
}

async function renderTierProfile(
  title: string,
  tier: ArchiveTier | LadderTier
) {
  const canvas = new OffscreenCanvas(1000, 250);
  const ctx = canvas.getContext("2d")!;
  const tierAssets = assets.tier[tier.code === "UNRANKED" ? "IR" : tier.code];
  const commonAssets = assets.common;

  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(await createImage(tierAssets.illust), 0, 0, 1000, 250);
  ctx.globalCompositeOperation = "overlay";
  ctx.drawImage(await createImage(tierAssets.background), 0, 0, 1000, 250);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(
    await createImage(commonAssets.symbolUnderlay),
    0,
    0,
    1000,
    250
  );
  ctx.globalCompositeOperation = "screen";
  ctx.drawImage(await createImage(tierAssets.symbol), 0, 0, 1000, 250);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(await createImage(commonAssets.frame), 0, 0, 1000, 250);
  ctx.font = "800 32px Montserrat, Pretendard, sans-serif";
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.fillText(title, 21, 33);

  ctx.font = "800 70px Montserrat, Pretendard, sans-serif";
  drawTextWithSpacing(ctx, tier.name.toUpperCase(), 41, 140, 70 * -0.04);

  ctx.font = "800 23px Montserrat, Pretendard, sans-serif";
  drawTextWithSpacing(ctx, Math.floor(tier.point) + "P", 41, 183, 23 * 0.36);

  return canvas.transferToImageBitmap();
}

async function renderCanvas(userInfo: UserInfo, isAnonymous: boolean) {
  const canvas = new OffscreenCanvas(2500, 1700);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(await createImage(assets.common.background), 0, 0, 2500, 1700);

  ctx.font = "800 37px Montserrat, Pretendard, sans-serif";
  ctx.fillStyle = "#13e7d3";
  ctx.textBaseline = "middle";
  const pos = drawTextWithSpacing(
    ctx,
    isAnonymous ? "PLAYER" : userInfo.name.toUpperCase(),
    180,
    221,
    37 * 0.23
  );
  ctx.fillStyle = "#fff";
  drawTextWithSpacing(ctx, "'s V-SCOUTER", pos, 221, 37 * 0.23);

  const dateYYYY = new Date().getFullYear().toString();
  const dateMM = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const dateDD = new Date().getDate().toString().padStart(2, "0");

  ctx.font = "800 16px Montserrat, Pretendard, sans-serif";
  drawTextWithSpacing(
    ctx,
    `- ${dateYYYY} ${dateMM} ${dateDD} -`,
    1157,
    1595,
    16 * 0.5
  );

  let offset = 0;

  if (userInfo.button4) {
    ctx.drawImage(
      await renderTierProfile("4 BUTTON TIER & POINTS", userInfo.button4),
      182,
      341
    );
    offset += 1;
  }

  if (userInfo.button5) {
    ctx.drawImage(
      await renderTierProfile("5 BUTTON TIER & POINTS", userInfo.button5),
      182,
      341 + (250 + 52) * offset
    );
    offset += 1;
  }

  if (userInfo.button6) {
    ctx.drawImage(
      await renderTierProfile("6 BUTTON TIER & POINTS", userInfo.button6),
      182,
      341 + (250 + 52) * offset
    );
    offset += 1;
  }

  if (userInfo.button8) {
    ctx.drawImage(
      await renderTierProfile("8 BUTTON TIER & POINTS", userInfo.button8),
      182,
      341 + (250 + 52) * offset
    );
  }

  ctx.drawImage(
    await renderTierProfile("AVERAGE TIER & POINTS", userInfo.average),
    1318,
    341
  );

  return canvas.transferToImageBitmap();
}

export const TierCanvas = memo(
  ({ userInfo, isAnonymous }: { userInfo: UserInfo; isAnonymous: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (!canvasRef.current) {
        return;
      }

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        return;
      }

      renderCanvas(userInfo, isAnonymous).then((res) =>
        ctx.drawImage(res, 0, 0)
      );
    }, [userInfo, isAnonymous]);

    return (
      <canvas
        ref={canvasRef}
        width={2500}
        height={1700}
        style={{
          width: 1250,
          height: 850,
        }}
      />
    );
  }
);
