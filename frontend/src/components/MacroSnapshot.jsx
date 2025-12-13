import React from "react";

function MacroSnapshot({ macros }) {
  if (!macros) return <div>Loading...</div>;

  const { protein, carbs, fat } = macros;

  const total = protein + carbs + fat;

  // Avoid division issues
  const proteinPct = (protein / total) * 100;
  const carbsPct = (carbs / total) * 100;
  const fatPct = (fat / total) * 100;

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        fontFamily: "monospace",
      }}
    >
      <h3 style={{ marginBottom: "12px", fontFamily: "monospace" }}>
        Daily Macro Breakdown
      </h3>

      {/* Stacked Bar */}
      <div
        style={{
          display: "flex",
          height: "18px",
          width: "100%",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid #ccc",
          backgroundColor: "#e0e0e0",
        }}
      >
        {/* Protein section */}
        <div
          style={{
            width: `${proteinPct}%`,
            backgroundColor: "#42A5F5", // blue
          }}
        ></div>

        {/* Carbs section */}
        <div
          style={{
            width: `${carbsPct}%`,
            backgroundColor: "#FFA726", // orange
          }}
        ></div>

        {/* Fat section */}
        <div
          style={{
            width: `${fatPct}%`,
            backgroundColor: "#FF7043", // reddish
          }}
        ></div>
      </div>

      {/* Labels */}
      <div
        style={{ marginTop: "12px", fontSize: "14px", fontFamily: "monospace" }}
      >
        <div>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#42A5F5",
              borderRadius: "2px",
              display: "inline-block",
              fontFamily: "monospace",
            }}
          ></span>
          <strong style={{ marginLeft: "6px", fontFamily: "monospace" }}>
            Protein:
          </strong>{" "}
          <span style={{ fontFamily: "monospace" }}> {protein}g</span>
        </div>
        <div>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#FFA726",
              borderRadius: "2px",
              display: "inline-block",
              fontFamily: "monospace",
            }}
          ></span>
          <strong style={{ marginLeft: "6px", fontFamily: "monospace" }}>
            Carbs:
          </strong>{" "}
          <span style={{ fontFamily: "monospace" }}> {carbs}g</span>
        </div>
        <div>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#FF7043",
              borderRadius: "2px",
              display: "inline-block",
              fontFamily: "monospace",
            }}
          ></span>
          <strong style={{ marginLeft: "6px", fontFamily: "monospace" }}>
            Fat:
          </strong>{" "}
          <span style={{ fontFamily: "monospace" }}> {fat}g</span>
        </div>
      </div>
    </div>
  );
}

export default MacroSnapshot;
