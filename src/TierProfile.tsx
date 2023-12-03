import * as assets from "./assets";
import { TierData } from "./vArchive";

interface TierProfileProps {
  title: string;
  data: TierData;
}

const ZOOM_RATIO = 0.5;

function TierProfile({ title, data }: TierProfileProps) {
  const tierAssets = assets.tier[data.code];
  const commonAssets = assets.common;

  return (
    <div
      style={{
        position: "relative",
        width: 1000 * ZOOM_RATIO,
        height: 250 * ZOOM_RATIO,
      }}
    >
      <img
        style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}
        src={tierAssets.illust}
      />
      <img
        style={{
          position: "absolute",
          mixBlendMode: "overlay",
          width: "100%",
        }}
        src={tierAssets.background}
      />
      <img
        style={{
          position: "absolute",
          width: "100%",
        }}
        src={commonAssets.symbolUnderlay}
      />
      <img
        style={{
          position: "absolute",
          mixBlendMode: "screen",
          width: "100%",
        }}
        src={tierAssets.symbol}
      />
      <img
        style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}
        src={commonAssets.frame}
      />
      <span
        style={{
          position: "absolute",
          left: 21 * ZOOM_RATIO,
          top: 12 * ZOOM_RATIO,
          fontWeight: 800,
          fontSize: 32 * ZOOM_RATIO,
          color: "#fff",
        }}
      >
        {title}
      </span>
      <span
        style={{
          position: "absolute",
          left: 41 * ZOOM_RATIO,
          top: 98 * ZOOM_RATIO,
          fontWeight: 800,
          fontSize: 70 * ZOOM_RATIO,
          letterSpacing: -2.8 * ZOOM_RATIO,
          color: "#fff",
        }}
      >
        {data.name.toUpperCase()}
      </span>
      <span
        style={{
          position: "absolute",
          left: 43 * ZOOM_RATIO,
          top: 169 * ZOOM_RATIO,
          fontWeight: 800,
          fontSize: 23 * ZOOM_RATIO,
          letterSpacing: 8.28 * ZOOM_RATIO,
          color: "#fff",
        }}
      >
        {Math.floor(data.point)}P
      </span>
    </div>
  );
}

export default TierProfile;