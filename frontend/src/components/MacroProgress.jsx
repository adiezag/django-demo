import React from "react";

function MacroProgress({ macros, showDate = false }) {
  if (!macros) {
    return <div>Loading macros...</div>;
  }
  // console.log("Macros data:", macros); // Add this
  const macroConfig = {
    calories: { label: "Calories", unit: "", color: "#9C27B0" },
    protein: { label: "Protein", unit: "g", color: "#42A5F5" },
    carbs: { label: "Carbs", unit: "g", color: "#FFA726" },
    fat: { label: "Fat", unit: "g", color: "#FF7043" },
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        fontFamily: "monospace",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Today's Progress
      </h3>
      {Object.entries(macroConfig).map(([key, config]) => {
        const consumed = macros.consumed[key];
        const target = macros.targets[key];
        // console.log("macros targets: ", macros.targets);
        const percentage = Math.round((consumed / target) * 100);
        const isOver = consumed > target;
        const barColor = isOver ? "#D32F2F" : config.color;

        // Special handling for calories - no bar, just value
        if (key === "calories") {
          return (
            <div
              key={key}
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {config.label}: {consumed}
              </span>
            </div>
          );
        }

        // Progress bar for protein, carbs, fat
        const filledBlocks = Math.min(10, Math.round((consumed / target) * 10));
        const emptyBlocks = 10 - filledBlocks;
        const progressBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

        return (
          <div
            key={key}
            style={{
              marginBottom: "8px",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "80px",
                fontWeight: "bold",
              }}
            >
              {config.label}
            </span>
            <span style={{ color: barColor, marginRight: "8px" }}>
              {progressBar}
            </span>
            <span>
              {consumed}
              {config.unit} / {target}
              {config.unit} ({percentage}%)
              {isOver && (
                <span style={{ color: "#D32F2F", marginLeft: "8px" }}>
                  OVER
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MacroProgress;
