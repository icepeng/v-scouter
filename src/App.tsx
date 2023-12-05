import { useState } from "react";
import "./App.css";
import TierProfile from "./TierProfile";
import { useUserInfo } from "./vArchive/useUserInfo";
import { common } from "./assets";

function App() {
  const [userName, setUserName] = useState("aaaa");
  const [submittedName, setSubmittedName] = useState(userName);
  const [selectedButtons, setSelectedButtons] = useState({
    button4: true,
    button5: true,
    button6: true,
    button8: true,
  });
  const userInfo = useUserInfo(submittedName, selectedButtons);

  if (!userInfo) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: 1250,
          height: 850,
          fontFamily: "Montserrat, Pretendard, sans-serif",
        }}
      >
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
          {userInfo.button4 && (
            <TierProfile
              title="4 BUTTON TIER & POINTS"
              tier={userInfo.button4}
            />
          )}
          {userInfo.button5 && (
            <TierProfile
              title="5 BUTTON TIER & POINTS"
              tier={userInfo.button5}
            />
          )}
          {userInfo.button6 && (
            <TierProfile
              title="6 BUTTON TIER & POINTS"
              tier={userInfo.button6}
            />
          )}
          {userInfo.button8 && (
            <TierProfile
              title="8 BUTTON TIER & POINTS"
              tier={userInfo.button8}
            />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 1318 / 2,
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <TierProfile title="AVERAGE TIER & POINTS" tier={userInfo.average} />
          <TierProfile title="EXPECTED LADDER TIER" tier={userInfo.expected} />
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
      <input
        id="button4"
        type="checkbox"
        checked={selectedButtons.button4}
        onChange={(e) =>
          setSelectedButtons({ ...selectedButtons, button4: e.target.checked })
        }
      />
      <label htmlFor="button4">4버튼</label>
      <input
        id="button5"
        type="checkbox"
        checked={selectedButtons.button5}
        onChange={(e) =>
          setSelectedButtons({ ...selectedButtons, button5: e.target.checked })
        }
      />
      <label htmlFor="button5">5버튼</label>
      <input
        id="button6"
        type="checkbox"
        checked={selectedButtons.button6}
        onChange={(e) =>
          setSelectedButtons({ ...selectedButtons, button6: e.target.checked })
        }
      />
      <label htmlFor="button6">6버튼</label>
      <input
        id="button8"
        type="checkbox"
        checked={selectedButtons.button8}
        onChange={(e) =>
          setSelectedButtons({ ...selectedButtons, button8: e.target.checked })
        }
      />
      <label htmlFor="button8">8버튼</label>
    </div>
  );
}

export default App;
