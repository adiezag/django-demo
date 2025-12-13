// import React from "react";

// function MacroProgress({ macros }) {
//   if (!macros) return null;

//   const metrics = [
//     { key: "calories", label: "C" },
//     { key: "protein", label: "P" },
//     { key: "carbs", label: "C" },
//     { key: "fat", label: "F" },
//   ];

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//       {metrics.map((metric) => {
//         const value = macros.consumed[metric.key];
//         const target = macros.targets[metric.key];
//         const percentage = Math.min(100, (value / target) * 100);
//         const color = value > target ? "#D32F2F" : "#4CAF50"; // red if exceeded, green otherwise

//         return (
//           <div
//             key={metric.key}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//             }}
//           >
//             {/* Metric label */}
//             <div
//               style={{
//                 width: "20px",
//                 fontWeight: "bold",
//                 fontSize: "12px",
//                 textAlign: "center",
//               }}
//               title={metric.key.charAt(0).toUpperCase() + metric.key.slice(1)}
//             >
//               {metric.label}
//             </div>

//             {/* Bar container */}
//             <div
//               style={{
//                 flex: 1,
//                 height: "12px",
//                 backgroundColor: "#eee",
//                 borderRadius: "6px",
//                 overflow: "hidden",
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   width: `${percentage}%`,
//                   height: "100%",
//                   backgroundColor: color,
//                   transition: "width 0.3s",
//                 }}
//                 title={`${value} / ${target}${
//                   metric.key === "calories" ? "" : "g"
//                 }`}
//               />
//             </div>

//             {/* Value */}
//             <div
//               style={{
//                 width: "36px",
//                 fontSize: "12px",
//                 textAlign: "right",
//               }}
//             >
//               {value}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default MacroProgress;

// import React from 'react';

// function MacroProgress({ macros, showDate = false }) {
//   if (!macros) {
//     return <div>Loading macros...</div>;
//   }

//   const macroConfig = {
//     calories: { label: 'Calories', unit: '', color: '#9C27B0' },
//     protein: { label: 'Protein', unit: 'g', color: '#42A5F5' },
//     carbs: { label: 'Carbs', unit: 'g', color: '#FFA726' },
//     fat: { label: 'Fat', unit: 'g', color: '#FF7043' },
//   };

//   return (
//     <div style={{
//       padding: '16px',
//       backgroundColor: '#f5f5f5',
//       borderRadius: '8px',
//       fontFamily: 'monospace',
//     }}>
//       <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>
//         {showDate ? `Daily Progress - ${macros.date}` : 'Daily Progress'}
//       </h3>

//       {Object.entries(macroConfig).map(([key, config]) => {
//         const consumed = macros.consumed[key];
//         const target = macros.targets[key];
//         const percentage = Math.round((consumed / target) * 100);
//         const isOver = consumed > target;
//         const barColor = isOver ? '#D32F2F' : config.color;

//         // Progress bar (10 blocks total)
//         const filledBlocks = Math.min(10, Math.round((consumed / target) * 10));
//         const emptyBlocks = 10 - filledBlocks;
//         const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

//         return (
//           <div key={key} style={{ marginBottom: '8px', fontSize: '14px' }}>
//             <span style={{ display: 'inline-block', width: '80px', fontWeight: 'bold' }}>
//               {config.label}
//             </span>
//             <span style={{ color: barColor, marginRight: '8px' }}>
//               {progressBar}
//             </span>
//             <span>
//               {consumed}{config.unit} / {target}{config.unit} ({percentage}%)
//               {isOver && <span style={{ color: '#D32F2F', marginLeft: '8px' }}>OVER</span>}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default MacroProgress;import React from 'react';

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
