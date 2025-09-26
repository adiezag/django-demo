// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MealPlanService from "../services/MealPlanService";
// import MealPlanDisplay from "../components/MealPlanDisplay";
// import MealPlanDisp from "../components/MealPlanDisp";
// import MealPlanChat from "../components/MealPlanChat";
// function MealPlans() {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [mealPlan, setMealPlan] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleGenerateMealPlan = async () => {
//     setIsGenerating(true);
//     setError(null);
//     setMealPlan(null);

//     try {
//       // get current user ID
//       const userId = await MealPlanService.getCurrentUserId();

//       // trigger meal plan generation
//       const mealPlanData = await MealPlanService.generateMealPlan(userId);
//       setMealPlan(mealPlanData);
//     } catch (err) {
//       console.error("Meal plan generation failed: ", err);
//       setError(err.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };
//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
//       {/* Header */}
//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             marginRight: "10px",
//             padding: "10px 20px",
//             backgroundColor: "#07536cff",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//           }}
//         >
//           ←Back to Dashboard
//         </button>
//         <h2>Personalized Meal Plan</h2>
//         <p style={{ color: "#450" }}>
//           Generated AI-powered meal recommendations based on your profile
//         </p>
//       </div>
//       {/* Generate button */}
//       {!mealPlan && !isGenerating && (
//         <div style={{ textAlign: "center", marginBottom: "30px" }}>
//           <button
//             onClick={handleGenerateMealPlan}
//             disabled={isGenerating}
//             style={{
//               padding: "15px 30px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "18px",
//               cursor: "pointer",
//               fontWeight: "bold",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//             }}
//           >
//             🍽️ Generate My Meal Plan
//           </button>
//         </div>
//       )}
//       {/* Loading State */}
//       {isGenerating && (
//         <div
//           style={{
//             textAlign: "center",
//             padding: "50px",
//             backgroundColor: "#f9f9f9",
//             borderRadius: "10px",
//             border: "2px solid #4CAF50",
//           }}
//         >
//           <div style={{ fontSize: "48px", marginBottom: "20px" }}>🤖</div>
//           <h3>AI is creating your personalized meal plan...</h3>
//           <p style={{ color: "#450", marginBottom: "20px" }}>
//             Analyzing your profile and generating recommendations
//           </p>
//           <div
//             style={{
//               width: "50px",
//               height: "50px",
//               border: "5px solid #f3f3f3",
//               borderTop: "5px solid #4CAF50",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//               margin: "0 auto",
//             }}
//           ></div>
//           <style>
//             {`
//               @keyframes spin {
//                 0% { transform: rotate(0deg); }
//                 100% { transform: rotate(360deg); }
//               }
//             `}
//           </style>
//         </div>
//       )}
//       {/* error state */}
//       {error && (
//         <div
//           style={{
//             backgroundColor: "#ffebee",
//             border: "2px solid #f44336",
//             borderRadius: "10px",
//             padding: "20px",
//             textAlign: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <h3 style={{ color: "#f44336", margin: "0 0 10px 0" }}>
//             ❌ Generation Failed
//           </h3>
//           <p style={{ margin: "0 0 15px 0" }}>{error}</p>
//           <button
//             onClick={handleGenerateMealPlan}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#f44336",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* Success State - Display Meal Plan */}
//       {mealPlan && (
//         <div>
//           <div style={{ textAlign: "center", marginBottom: "20px" }}>
//             <h3 style={{ color: "#4CAF50" }}>✅ Your Meal Plan is Ready!</h3>
//             <button
//               onClick={() => {
//                 setMealPlan(null);
//                 setError(null);
//               }}
//               style={{
//                 padding: "8px 15px",
//                 backgroundColor: "#2196F3",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 marginLeft: "10px",
//               }}
//             >
//               Generate New Plan
//             </button>
//           </div>
//           {/* Meal Plan Display */}
//           <div
//             style={{
//               backgroundColor: "white",
//               borderRadius: "10px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               padding: "25px",
//               border: "3px solid #4CAF50",
//             }}
//           >
//             {/* This will display whatever structure n8n returns */}
//             {/* <MealPlanDisplay data={mealPlan} /> */}
//             <MealPlanDisp data={mealPlan} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MealPlans;

import { useNavigate } from "react-router-dom";
import MealPlanChat from "../components/MealPlanChat";

function MealPlans() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Meal Plans</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#546E7A",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Dashboard
        </button>
      </div>
      <div>
        <h3 style={{ marginBottom: "10px" }}>AI Nutrition Assistant</h3>

        <p>
          Chat with your personal AI nutrition assistant for meal plans and
          dietary advice. Get personalized recommendations based on your goals
          and preferences.
        </p>
      </div>
      <MealPlanChat />
    </div>
  );
}

export default MealPlans;
