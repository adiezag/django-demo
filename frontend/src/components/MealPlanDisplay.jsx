// function MealPlanDisplay({ data }) {
//   // This component will format and display the meal plan data returned from n8n
//   // The exact structure depends on what your n8n workflow returns

//   return (
//     <div>
//       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
//         🍽️ Your Personalized Meal Plan
//       </h3>

//       {/* Basic display - adjust based on your n8n response structure */}
//       <pre
//         style={{
//           backgroundColor: "#f5f5f5",
//           padding: "15px",
//           borderRadius: "5px",
//           overflow: "auto",
//           whiteSpace: "pre-wrap",
//           fontFamily: "inherit",
//           fontSize: "14px",
//           border: "1px solid #ddd",
//         }}
//       >
//         {JSON.stringify(data, null, 2)}
//       </pre>

//       {/*
//       TODO: Replace the above <pre> block with proper meal plan formatting
//       once you know the structure of data returned from n8n workflow.

//       Example structure might be:
//       {
//         "breakfast": "...",
//         "lunch": "...",
//         "dinner": "...",
//         "snacks": "...",
//         "calories": 2000,
//         "notes": "..."
//       }
//       */}
//     </div>
//   );
// }

// 1

// function MealPlanDisplay({ data }) {
//   // Parse the meal plan text from n8n response
//   const mealPlanText = data?.output || "";

//   // Helper function to extract sections from the text
//   const parseSection = (text, startPattern, endPattern) => {
//     const startIndex = text.indexOf(startPattern);
//     if (startIndex === -1) return "";

//     const contentStart = startIndex + startPattern.length;
//     const endIndex = endPattern
//       ? text.indexOf(endPattern, contentStart)
//       : text.length;

//     return text
//       .substring(contentStart, endIndex === -1 ? text.length : endIndex)
//       .trim();
//   };
//   // Extract profile section
//   const profileSection = parseSection(
//     mealPlanText,
//     "User Profile:",
//     "Personalized Daily Meal Plan"
//   );

//   // Extract meals
//   const breakfastSection = parseSection(
//     mealPlanText,
//     "Breakfast:",
//     "Morning Snack:"
//   );
//   const morningSnackSection = parseSection(
//     mealPlanText,
//     "Morning Snack:",
//     "Lunch:"
//   );
//   const lunchSection = parseSection(mealPlanText, "Lunch:", "Afternoon Snack:");
//   const afternoonSnackSection = parseSection(
//     mealPlanText,
//     "Afternoon Snack:",
//     "Dinner:"
//   );
//   const dinnerSection = parseSection(
//     mealPlanText,
//     "Dinner:",
//     "Total Estimated Daily Calories:"
//   );

//   // Extract total calories
//   const totalCaloriesMatch = mealPlanText.match(
//     /Total Estimated Daily Calories:\s*~?(\d+)\s*kcal/
//   );
//   const totalCalories = totalCaloriesMatch ? totalCaloriesMatch[1] : "Unknown";

//   const formatMealSection = (sectionText, mealName, emoji) => {
//     if (!sectionText) return null;
//     const lines = sectionText.split("\n").filter((line) => line.trim());
//     const foodItems = [];
//     let calories = "";
//     let nutritionalNotes = "";
//     let portion = "";

//     lines.forEach((line) => {
//       const trimmedLine = line.trim();
//       if (trimmedLine.startsWith("- ")) {
//         foodItems.push(trimmedLine.substring(2));
//       } else if (trimmedLine.includes("Estimated Calories:")) {
//         calories = trimmedLine.replace("Estimated Calories:", "").trim();
//       } else if (trimmedLine.includes("Nutritional Notes:")) {
//         nutritionalNotes = trimmedLine.replace("Nutritional Notes:", "").trim();
//       } else if (trimmedLine.includes("Portion:")) {
//         portion = trimmedLine.replace("Portion:", "").trim();
//       }
//     });
//     return (
//       <div
//         style={{
//           backgroundColor: "#f8f9fa",
//           padding: "20px",
//           borderRadius: "10px",
//           marginBottom: "20px",
//           border: "1px solid #e9ecef",
//         }}
//       >
//         <h4
//           style={{
//             color: "#2c3e50",
//             marginBottom: "15px",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <span>{emoji}</span> {mealName}
//         </h4>

//         {foodItems.length > 0 && (
//           <div style={{ marginBottom: "15px" }}>
//             <strong>Food Items:</strong>
//             <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
//               {foodItems.map((item, index) => (
//                 <li
//                   key={index}
//                   style={{ marginBottom: "5px", lineHeight: "1.5" }}
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {calories && (
//           <div
//             style={{
//               backgroundColor: "#e8f5e8",
//               padding: "8px 12px",
//               borderRadius: "5px",
//               marginBottom: "10px",
//               display: "inline-block",
//             }}
//           >
//             <strong>⚡ {calories}</strong>
//           </div>
//         )}

//         {nutritionalNotes && (
//           <div style={{ marginBottom: "10px" }}>
//             <strong>💡 Nutritional Notes:</strong>
//             <p style={{ margin: "5px 0", color: "#555", fontStyle: "italic" }}>
//               {nutritionalNotes}
//             </p>
//           </div>
//         )}

//         {portion && (
//           <div>
//             <strong>🍽️ Portion:</strong>
//             <p style={{ margin: "5px 0", color: "#555" }}>{portion}</p>
//           </div>
//         )}
//       </div>
//     );
//   };
//   return (
//     <div>
//       <h3
//         style={{ textAlign: "center", marginBottom: "25px", color: "#2c3e50" }}
//       >
//         🍽️ Your Personalized Meal Plan
//       </h3>

//       {/* User Profile Summary */}
//       {profileSection && (
//         <div
//           style={{
//             backgroundColor: "#e3f2fd",
//             padding: "15px",
//             borderRadius: "8px",
//             marginBottom: "25px",
//             border: "2px solid #2196F3",
//           }}
//         >
//           <h4 style={{ color: "#1976d2", marginBottom: "10px" }}>
//             👤 Your Profile
//           </h4>
//           <div
//             style={{ whiteSpace: "pre-line", color: "#333", lineHeight: "1.6" }}
//           >
//             {profileSection.replace(/^- /gm, "• ")}
//           </div>
//         </div>
//       )}

//       {/* Meals */}
//       <div style={{ marginBottom: "25px" }}>
//         {formatMealSection(breakfastSection, "Breakfast", "🌅")}
//         {formatMealSection(morningSnackSection, "Morning Snack", "🥨")}
//         {formatMealSection(lunchSection, "Lunch", "☀️")}
//         {formatMealSection(afternoonSnackSection, "Afternoon Snack", "🍎")}
//         {formatMealSection(dinnerSection, "Dinner", "🌙")}
//       </div>
//       {/* Total Calories Summary */}
//       <div
//         style={{
//           backgroundColor: "#fff3e0",
//           padding: "20px",
//           borderRadius: "10px",
//           textAlign: "center",
//           border: "3px solid #ff9800",
//         }}
//       >
//         <h3 style={{ color: "#f57c00", margin: "0 0 10px 0" }}>
//           🔥 Total Daily Calories: ~{totalCalories} kcal
//         </h3>
//         <p style={{ margin: "0", color: "#450", fontStyle: "italic" }}>
//           Balanced nutrition designed for your active lifestyle and weight gain
//           goals
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div style={{ textAlign: "center", marginTop: "25px" }}>
//         <button
//           onClick={() => window.print()}
//           style={{
//             padding: "12px 25px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//             marginRight: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           🖨️ Print Meal Plan
//         </button>
//         <button
//           onClick={() => {
//             navigator.clipboard.writeText(mealPlanText);
//             alert("Meal plan copied to clipboard!");
//           }}
//           style={{
//             padding: "12px 25px",
//             backgroundColor: "#2196F3",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           📋 Copy to Clipboard
//         </button>
//       </div>
//     </div>
//   );
// }
// export default MealPlanDisplay;

// 2
function MealPlanDisplay({ data }) {
  // Parse the meal plan text from n8n response
  const mealPlanText = data?.output || "";

  // Helper function to extract profile section
  const extractProfile = (text) => {
    const startPattern = "User Profile:";
    const endPatterns = [
      "Personalized Daily Meal Plan",
      "Daily Meal Plan",
      "Meal Plan",
      "Breakfast:",
    ];

    const startIndex = text.indexOf(startPattern);
    if (startIndex === -1) return "";

    const contentStart = startIndex + startPattern.length;
    let endIndex = text.length;

    // Find the earliest end pattern
    for (const pattern of endPatterns) {
      const patternIndex = text.indexOf(pattern, contentStart);
      if (patternIndex !== -1 && patternIndex < endIndex) {
        endIndex = patternIndex;
      }
    }

    return text.substring(contentStart, endIndex).trim();
  };

  // Dynamic meal parsing function
  const parseMeals = (text) => {
    const meals = [];

    // Common meal patterns to look for
    const mealPatterns = [
      /^(Breakfast|Morning Meal|First Meal):/gm,
      /^(Morning Snack|Mid-Morning Snack|AM Snack):/gm,
      /^(Lunch|Midday Meal|Second Meal):/gm,
      /^(Afternoon Snack|Mid-Afternoon Snack|PM Snack):/gm,
      /^(Dinner|Evening Meal|Last Meal|Third Meal):/gm,
      /^(Evening Snack|Night Snack|Late Snack):/gm,
      /^(Pre-workout|Post-workout|Workout Snack):/gim,
      /^(Snack \d+|Meal \d+):/gm,
      // Generic pattern for any meal
      /^([A-Za-z\s\-]+):/gm,
    ];

    // Find all meal sections
    const mealMatches = [];
    let match;

    // Use a comprehensive regex to find meal headers
    const mealRegex = /^([A-Za-z][A-Za-z\s\-0-9]*?):\s*$/gm;

    while ((match = mealRegex.exec(text)) !== null) {
      const mealName = match[1].trim();
      const startIndex = match.index;

      // Skip if it's likely not a meal (profile info, calories, etc.)
      if (
        mealName.toLowerCase().includes("profile") ||
        mealName.toLowerCase().includes("calories") ||
        mealName.toLowerCase().includes("notes") ||
        mealName.toLowerCase().includes("total") ||
        mealName.toLowerCase().includes("estimated") ||
        mealName.toLowerCase().includes("nutritional")
      ) {
        continue;
      }

      mealMatches.push({
        name: mealName,
        startIndex,
        match: match[0],
      });
    }

    // Extract content for each meal
    for (let i = 0; i < mealMatches.length; i++) {
      const currentMeal = mealMatches[i];
      const nextMeal = mealMatches[i + 1];

      const contentStart = currentMeal.startIndex + currentMeal.match.length;
      const contentEnd = nextMeal
        ? nextMeal.startIndex
        : text.indexOf("Total Estimated Daily Calories:", contentStart);

      const endIndex = contentEnd !== -1 ? contentEnd : text.length;
      const mealContent = text.substring(contentStart, endIndex).trim();

      if (mealContent) {
        meals.push({
          name: currentMeal.name,
          content: mealContent,
        });
      }
    }

    return meals;
  };

  // Parse meal content into structured data
  const parseMealContent = (content) => {
    const lines = content.split("\n").filter((line) => line.trim());
    const foodItems = [];
    let calories = "";
    let nutritionalNotes = "";
    let portion = "";

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("- ")) {
        foodItems.push(trimmedLine.substring(2));
      } else if (trimmedLine.toLowerCase().includes("estimated calories:")) {
        calories = trimmedLine.replace(/estimated calories:/i, "").trim();
      } else if (trimmedLine.toLowerCase().includes("calories:")) {
        calories = trimmedLine.replace(/calories:/i, "").trim();
      } else if (trimmedLine.toLowerCase().includes("nutritional notes:")) {
        nutritionalNotes = trimmedLine
          .replace(/nutritional notes:/i, "")
          .trim();
      } else if (trimmedLine.toLowerCase().includes("portion:")) {
        portion = trimmedLine.replace(/portion:/i, "").trim();
      }
    });

    return { foodItems, calories, nutritionalNotes, portion };
  };

  // Get meal emoji based on name
  const getMealEmoji = (mealName) => {
    const name = mealName.toLowerCase();
    if (name.includes("breakfast") || name.includes("morning meal"))
      return "🌅";
    if (name.includes("lunch") || name.includes("midday")) return "☀️";
    if (name.includes("dinner") || name.includes("evening")) return "🌙";
    if (name.includes("morning") && name.includes("snack")) return "🥨";
    if (name.includes("afternoon") && name.includes("snack")) return "🍎";
    if (name.includes("evening") && name.includes("snack")) return "🌃";
    if (name.includes("workout")) return "💪";
    if (name.includes("snack")) return "🥜";
    if (name.includes("meal")) return "🍽️";
    return "🥗"; // Default emoji
  };

  // Format individual meal section
  const formatMealSection = (meal) => {
    const { name, content } = meal;
    const { foodItems, calories, nutritionalNotes, portion } =
      parseMealContent(content);
    const emoji = getMealEmoji(name);

    return (
      <div
        key={name}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "1px solid #e9ecef",
        }}
      >
        <h4
          style={{
            color: "#2c3e50",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>{emoji}</span> {name}
        </h4>

        {foodItems.length > 0 && (
          <div style={{ marginBottom: "15px" }}>
            <strong>Food Items:</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              {foodItems.map((item, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "5px", lineHeight: "1.5" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {calories && (
          <div
            style={{
              backgroundColor: "#e8f5e8",
              padding: "8px 12px",
              borderRadius: "5px",
              marginBottom: "10px",
              display: "inline-block",
            }}
          >
            <strong>⚡ {calories}</strong>
          </div>
        )}

        {nutritionalNotes && (
          <div style={{ marginBottom: "10px" }}>
            <strong>💡 Nutritional Notes:</strong>
            <p style={{ margin: "5px 0", color: "#555", fontStyle: "italic" }}>
              {nutritionalNotes}
            </p>
          </div>
        )}

        {portion && (
          <div>
            <strong>🍽️ Portion:</strong>
            <p style={{ margin: "5px 0", color: "#555" }}>{portion}</p>
          </div>
        )}
      </div>
    );
  };

  // Extract data
  const profileSection = extractProfile(mealPlanText);
  const meals = parseMeals(mealPlanText);

  // Extract total calories
  const totalCaloriesMatch = mealPlanText.match(
    /Total Estimated Daily Calories:\s*~?(\d+)\s*kcal/i
  );
  const totalCalories = totalCaloriesMatch ? totalCaloriesMatch[1] : "Unknown";
  console.log(totalCalories);

  return (
    <div>
      <h3
        style={{ textAlign: "center", marginBottom: "25px", color: "#2c3e50" }}
      >
        🍽️ Your Personalized Meal Plan
      </h3>

      {/* User Profile Summary */}
      {profileSection && (
        <div
          style={{
            backgroundColor: "#e3f2fd",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "25px",
            border: "2px solid #2196F3",
          }}
        >
          <h4 style={{ color: "#1976d2", marginBottom: "10px" }}>
            👤 Your Profile
          </h4>
          <div
            style={{ whiteSpace: "pre-line", color: "#333", lineHeight: "1.6" }}
          >
            {profileSection.replace(/^- /gm, "• ")}
          </div>
        </div>
      )}

      {/* Dynamic Meals Rendering */}
      <div style={{ marginBottom: "25px" }}>
        {meals.length > 0 ? (
          meals.map((meal) => formatMealSection(meal))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              color: "#450",
            }}
          >
            <p>No meals found in the meal plan data.</p>
            <details style={{ marginTop: "20px", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                View Raw Data (for debugging)
              </summary>
              <pre
                style={{
                  backgroundColor: "#fff",
                  padding: "15px",
                  borderRadius: "5px",
                  marginTop: "10px",
                  overflow: "auto",
                  fontSize: "12px",
                }}
              >
                {mealPlanText}
              </pre>
            </details>
          </div>
        )}
      </div>

      {/* Total Calories Summary */}
      <div
        style={{
          backgroundColor: "#fff3e0",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          border: "3px solid #ff9800",
        }}
      >
        <h3 style={{ color: "#f57c00", margin: "0 0 10px 0" }}>
          🔥 Total Daily Calories: ~{totalCalories} kcal
        </h3>
        <p style={{ margin: "0", color: "#e65100", fontStyle: "italic" }}>
          {meals.length > 0
            ? `${meals.length} meals planned for your active lifestyle`
            : "Balanced nutrition designed for your goals"}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "12px 25px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          🖨️ Print Meal Plan
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(mealPlanText);
            alert("Meal plan copied to clipboard!");
          }}
          style={{
            padding: "12px 25px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📋 Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default MealPlanDisplay;
