import { useState } from "react";
import "./App.css";
import TierProfile from "./TierProfile";
import { useUserInfo } from "./vArchive/useUserInfo";
import { common } from "./assets";

function App() {
  const [userName, setUserName] = useState("aaaa");
  const [submittedName, setSubmittedName] = useState(userName);
  const userInfo = useUserInfo(submittedName);

  if (!userInfo) {
    return null;
  }

  return (
    <div>
      <div style={{ position: "relative", width: 1250, height: 850 }}>
        <img
          style={{ position: "absolute", width: "100%" }}
          src={common.background}
        />
        <span
          style={{
            position: "absolute",
            top: 100,
            left: 90,
            color: "#fff",
            fontWeight: 800,
            fontSize: 37 / 2,
            letterSpacing: 8.51 / 2,
          }}
        >
          <span style={{ color: "#13e7d3" }}>
            {submittedName.toUpperCase()}
          </span>
          <span>'s V-SCOUTER</span>
        </span>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 90,
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <TierProfile title="4 BUTTON TIER & POINTS" tier={userInfo.button4} />
          <TierProfile title="5 BUTTON TIER & POINTS" tier={userInfo.button5} />
          <TierProfile title="6 BUTTON TIER & POINTS" tier={userInfo.button6} />
          <TierProfile title="8 BUTTON TIER & POINTS" tier={userInfo.button8} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 1318 / 2,
          }}
        >
          <TierProfile title="AVERAGE TIER & POINTS" tier={userInfo.average} />
        </div>
      </div>

      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSubmittedName(userName);
          }
        }}
      />
      <button onClick={() => setSubmittedName(userName)}>확인</button>
    </div>
  );
}

export default App;
