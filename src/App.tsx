import { useState } from "react";
import "./App.css";
import TierProfile from "./TierProfile";
import { useUserInfo } from "./vArchive";

function App() {
  const [userName, setUserName] = useState("aaaa");
  const [submittedName, setSubmittedName] = useState(userName);
  const userInfo = useUserInfo(submittedName);

  if (!userInfo) {
    return null;
  }

  return (
    <div>
      <div>
        <TierProfile title="4 BUTTON TIER & POINTS" data={userInfo.button4} />
        <TierProfile title="5 BUTTON TIER & POINTS" data={userInfo.button5} />
        <TierProfile title="6 BUTTON TIER & POINTS" data={userInfo.button6} />
        <TierProfile title="8 BUTTON TIER & POINTS" data={userInfo.button8} />
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
