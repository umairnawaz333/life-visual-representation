import React, { useState, useEffect } from "react";
interface Props {
  dob: string;
  expectedAge: number;
}
const LifeTrackerAnimated = ({ dob, expectedAge }: Props) => {
  const calculateWeeks = () => {
    if (!dob || !expectedAge) return [];

    const birthDate = new Date(dob);
    const today = new Date();
    const totalWeeks = Math.floor(
      (today.getTime() - birthDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    const allWeeks = new Array(expectedAge * 52).fill(false);

    for (let i = 0; i < totalWeeks && i < allWeeks.length; i++) {
      allWeeks[i] = true;
    }

    return allWeeks;
  };

  const [weeks, setWeeks] = useState(calculateWeeks);

  useEffect(() => {
    setWeeks(calculateWeeks());
  }, [dob, expectedAge]);

  return (
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(14px, 1fr))",
            gap: "6px",
            justifyContent: "center",
            padding: "20px",
            width: "calc(100vw - 60px)",
            height: "calc(100vh - 120px)",
            gridAutoRows: "minmax(14px, 1fr)",
            background: "linear-gradient(to bottom, #d3e5ff, #f5f9ff)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {weeks.map((filled, index) => (
            <div
              key={index}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: filled ? "#0077cc" : "#d3d3d3",
                aspectRatio: "1 / 1",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                cursor: "pointer",
                boxShadow: filled
                  ? "0px 0px 6px rgba(0, 119, 204, 0.7)"
                  : "none",
              }}
              title="1 week"
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.4)";
                e.target.style.backgroundColor = "#0055aa";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.backgroundColor = filled ? "#0077cc" : "#d3d3d3";
              }}
            />
          ))}
        </div>
      </div>
  );
};

export default LifeTrackerAnimated;
