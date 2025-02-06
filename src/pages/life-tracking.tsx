import React, { useState, useEffect } from "react";
interface Props {
  dob: string;
  expectedAge: number;
}
const LifeTracker = ({ dob, expectedAge }: Props) => {
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

  const [weeks, setWeeks] = useState<boolean[]>(calculateWeeks);

  useEffect(() => {
    localStorage.setItem("dob", dob);
    localStorage.setItem("expectedAge", expectedAge.toString());
    setWeeks(calculateWeeks());
  }, [dob, expectedAge]);

  return (
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(14px, 1fr))",
            gap: "6px",
            padding: "20px",
            justifyContent: "center",
            width: "calc(100vw - 60px)",
            gridAutoRows: "minmax(14px, 1fr)",
          }}
        >
          {weeks.map((filled, index) => (
            <div
              key={index}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: filled ? "#222" : "#d3d3d3",
                aspectRatio: "1 / 1",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                cursor: "pointer",
              }}
              title="1 week"
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          ))}
        </div>
      </div>
  );
};

export default LifeTracker;
