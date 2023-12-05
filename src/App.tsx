import { useState } from "react";
import "./App.css";
import { TierCanvas } from "./Canvas";
import { useUserInfo } from "./vArchive/useUserInfo";

function App() {
  const [userName, setUserName] = useState("aaaa");
  const [submittedName, setSubmittedName] = useState(userName);
  const [selectedButtons, setSelectedButtons] = useState({
    button4: true,
    button5: true,
    button6: true,
    button8: true,
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const userInfo = useUserInfo(submittedName, selectedButtons);

  return (
    <div>
      <div>
        {userInfo ? (
          <TierCanvas userInfo={userInfo} isAnonymous={isAnonymous} />
        ) : (
          <div
            style={{
              width: 2500 / 2,
              height: 1700 / 2,
              border: "1px solid #fff",
            }}
          >
            등록되지 않은 유저입니다.
          </div>
        )}
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
      <input
        id="anonymous"
        type="checkbox"
        checked={isAnonymous}
        onChange={(e) => setIsAnonymous(e.target.checked)}
      />
      <label htmlFor="anonymous">익명</label>
    </div>
  );
}

export default App;
