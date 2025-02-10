import React, { useState, useEffect } from "react";
import "./App.css";
import LifeTracker from "./pages/life-tracking.tsx";
import LifeTrackerAnimated from "./pages/life-tracking-animated.tsx";

function App() {
  const [selectedPage, setSelectedPage] = useState("animated");
  const [dob, setDob] = useState(() => localStorage.getItem("dob") || "");
  const [expectedAge, setExpectedAge] = useState<number>(() => {
    const saved = localStorage.getItem("expectedAge");
    if (!saved) return 0;
    const parsed = parseInt(saved);
    return isNaN(parsed) ? 0 : Math.min(parsed, 120);
  });

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setExpectedAge(0);
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setExpectedAge(Math.min(numValue, 120));
    }
  };

  useEffect(() => {
    localStorage.setItem("dob", dob);
    localStorage.setItem("expectedAge", expectedAge.toString());
  }, [dob, expectedAge]);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <h2>Life Visual Representation</h2>
        {/* <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            minWidth: "200px",
          }}
        >
          <option value="animated">Animated Life Tracker</option>
          <option value="static">Static Life Tracker</option>
        </select> */}

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
          <label>
            Expected Age:
            <input
              type="text"
              value={expectedAge}
              onChange={handleAgeChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
      </div>

      <div style={{ flex: 1 }}>
      <LifeTracker dob={dob} expectedAge={expectedAge} />
        {/* {selectedPage !== "animated" ? (
          <LifeTracker dob={dob} expectedAge={expectedAge} />
        ) : (
          <LifeTrackerAnimated dob={dob} expectedAge={expectedAge} />
        )} */}
      </div>
    </div>
  );
}

export default App;
