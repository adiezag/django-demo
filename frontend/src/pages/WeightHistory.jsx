// import { useState, useEffect } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";
// import ProgressChart from "../components/ProgressChart";
// import ProgressList from "../components/ProgressList";
// import MealPlanService from "../services/MealPlanService";
// import NutritionChart from "../components/NutritionChart";
// import TimeSlider from "../components/TimeSlider";

// function WeightHistory() {
//   const [mode, setMode] = useState("weight");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewMode, setViewMode] = useState("chart");
//   const [data, setData] = useState([]);
//   const [allNutritionData, setAllNutritionData] = useState([]); // Store all nutrition data

//   const [allWeightData, setAllWeightData] = useState([]);
//   const [weightSliderStart, setWeightSliderStart] = useState(null);
//   const [weightSliderEnd, setWeightSliderEnd] = useState(null);

//   // Slider state
//   const [sliderStart, setSliderStart] = useState(null);
//   const [sliderEnd, setSliderEnd] = useState(null);

//   const [startDate, setStartDate] = useState(() => {
//     const d = new Date();
//     d.setDate(d.getDate() - 6);
//     return d.toLocaleDateString("en-CA");
//   });

//   const [endDate, setEndDate] = useState(() => {
//     return new Date().toLocaleDateString("en-CA");
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, [mode]);

//   useEffect(() => {
//     // When slider range changes, filter nutrition data
//     if (
//       mode === "nutrition" &&
//       sliderStart &&
//       sliderEnd &&
//       allNutritionData.length > 0
//     ) {
//       const filtered = allNutritionData.filter(
//         (entry) => entry.date >= sliderStart && entry.date <= sliderEnd
//       );
//       setData(filtered);
//     }
//   }, [sliderStart, sliderEnd, mode, allNutritionData]);

//   // Update weight data filtering
//   useEffect(() => {
//     if (
//       mode === "weight" &&
//       weightSliderStart &&
//       weightSliderEnd &&
//       allWeightData.length > 0
//     ) {
//       const filtered = allWeightData.filter(
//         (entry) =>
//           entry.date >= weightSliderStart && entry.date <= weightSliderEnd
//       );
//       setData(filtered);
//     }
//   }, [weightSliderStart, weightSliderEnd, mode, allWeightData]);
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (mode === "weight") {
//         const { data } = await api.get("/api/weight-history/");
//         const weightData = data
//           .map((entry) => ({
//             date: entry.recorded_at.slice(0, 10),
//             value: entry.weight,
//           }))
//           .reverse();

//         setAllWeightData(weightData);

//         // Initially show last 7 entries
//         const lastSeven = weightData.slice(-7);
//         setData(lastSeven);
//       } else if (mode === "nutrition") {
//         // Fetch ALL nutrition data (not just 7 days)
//         const firstDate = "2024-01-01"; // Or fetch from user profile creation date
//         const today = new Date().toLocaleDateString("en-CA");
//         const nutritionData = await MealPlanService.getCalAndMacros(
//           firstDate,
//           today
//         );
//         setAllNutritionData(nutritionData);

//         // Initially show last 7 days
//         const lastSevenDays = nutritionData.slice(-7);
//         setData(lastSevenDays);
//       }
//     } catch (err) {
//       console.error("Error fetching progress data: ", err);
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           padding: "50px",
//           fontFamily: "monospace",
//         }}
//       >
//         <h2>Error</h2>
//         <p>{error}</p>
//         <button
//           onClick={() => {
//             setError(null);
//             fetchData();
//           }}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#c5ced3ff",
//             color: "#000000",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontFamily: "monospace",
//             fontWeight: "bold",
//             fontSize: "15px",
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
//       {/* Top Navigation */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "20px",
//           fontFamily: "monospace",
//         }}
//       >
//         <h2>Progress tracker</h2>
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             padding: "10px 20px",
//             color: "#000000",
//             border: "none",
//             borderRadius: "5px",
//             fontSize: "16px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontFamily: "monospace",
//           }}
//         >
//           ← Dashboard
//         </button>
//       </div>

//       {/* Mode Selector */}
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         {["weight", "nutrition"].map((m) => (
//           <button
//             key={m}
//             onClick={() => setMode(m)}
//             style={{
//               padding: "10px 20px",
//               margin: "0 5px",
//               backgroundColor: mode === m ? "#546E7A" : "#f0f0f0",
//               color: mode === m ? "white" : "#450",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontFamily: "monospace",
//             }}
//           >
//             {m.charAt(0).toUpperCase() + m.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Time Slider - only for nutrition mode */}
//       {mode === "nutrition" && allNutritionData.length > 0 && (
//         <TimeSlider
//           minDate={allNutritionData[0].date}
//           maxDate={allNutritionData[allNutritionData.length - 1].date}
//           windowSize={7}
//           onRangeChange={(start, end) => {
//             setSliderStart(start);
//             setSliderEnd(end);
//           }}
//         />
//       )}

//       {mode === "weight" && allWeightData.length > 0 && (
//         <TimeSlider
//           minDate={allWeightData[0].date}
//           maxDate={allWeightData[allWeightData.length - 1].date}
//           windowSize={7}
//           onRangeChange={(start, end) => {
//             setWeightSliderStart(start);
//             setWeightSliderEnd(end);
//           }}
//         />
//       )}

//       {/* View Mode Selector */}
//       {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         {["chart", "list"].map((v) => (
//           <button
//             key={v}
//             onClick={() => setViewMode(v)}
//             style={{
//               padding: "8px 16px",
//               margin: "0 5px",
//               backgroundColor: viewMode === v ? "#546E7A" : "#f0f0f0",
//               color: viewMode === v ? "white" : "#450",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontFamily: "monospace",
//             }}
//           >
//             {v === "chart" ? "📈 Chart" : "📋 List"}
//           </button>
//         ))}
//       </div> */}

//       {/* Main Content */}
//       {viewMode === "chart" ? (
//         mode === "weight" ? (
//           <ProgressChart data={data} label={mode} />
//         ) : (
//           <NutritionChart data={data} />
//         )
//       ) : (
//         <ProgressList data={data} label={mode} />
//       )}
//     </div>
//   );
// }

// export default WeightHistory;

// import { useState, useEffect } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";
// import ProgressChart from "../components/ProgressChart";
// import ProgressList from "../components/ProgressList";
// import MealPlanService from "../services/MealPlanService";
// import NutritionChart from "../components/NutritionChart";
// import TimeSlider from "../components/TimeSlider";

// // Helper function to forward-fill missing dates
// function forwardFillData(data, startDate, endDate) {
//   if (!data || data.length === 0) return [];

//   const result = [];
//   const start = new Date(startDate + "T00:00:00");
//   const end = new Date(endDate + "T00:00:00");

//   // Create a map of existing data
//   const dataMap = {};
//   data.forEach((entry) => {
//     dataMap[entry.date] = entry.value;
//   });

//   // Get last known value before start date
//   let lastValue = null;
//   const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date));
//   for (const entry of sortedData) {
//     if (entry.date <= startDate) {
//       lastValue = entry.value;
//     }
//   }

//   // Fill all dates in range
//   const currentDate = new Date(start);
//   while (currentDate <= end) {
//     const dateStr = currentDate.toISOString().split("T")[0];

//     if (dataMap[dateStr] !== undefined) {
//       lastValue = dataMap[dateStr];
//       result.push({ date: dateStr, value: lastValue });
//     } else if (lastValue !== null) {
//       result.push({ date: dateStr, value: lastValue });
//     }

//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return result;
// }

// function WeightHistory() {
//   const [mode, setMode] = useState("weight");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewMode, setViewMode] = useState("chart");
//   const [data, setData] = useState([]);
//   const [allNutritionData, setAllNutritionData] = useState([]);

//   const [allWeightData, setAllWeightData] = useState([]);
//   const [weightSliderStart, setWeightSliderStart] = useState(null);
//   const [weightSliderEnd, setWeightSliderEnd] = useState(null);

//   const [sliderStart, setSliderStart] = useState(null);
//   const [sliderEnd, setSliderEnd] = useState(null);

//   const [globalWeightRange, setGlobalWeightRange] = useState(null);
//   const [globalNutritionRange, setGlobalNutritionRange] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, [mode]);

//   useEffect(() => {
//     if (
//       mode === "nutrition" &&
//       sliderStart &&
//       sliderEnd &&
//       allNutritionData.length > 0
//     ) {
//       const filtered = allNutritionData.filter(
//         (entry) => entry.date >= sliderStart && entry.date <= sliderEnd
//       );
//       setData(filtered);
//     }
//   }, [sliderStart, sliderEnd, mode, allNutritionData]);

//   useEffect(() => {
//     if (
//       mode === "weight" &&
//       weightSliderStart &&
//       weightSliderEnd &&
//       allWeightData.length > 0
//     ) {
//       // Use forward-fill for weight data
//       const filled = forwardFillData(
//         allWeightData,
//         weightSliderStart,
//         weightSliderEnd
//       );
//       setData(filled);
//     }
//   }, [weightSliderStart, weightSliderEnd, mode, allWeightData]);

//   //   setLoading(true);
//   //   setError(null);
//   //   try {
//   //     if (mode === "weight") {
//   //       const { data } = await api.get("/api/weight-history/");
//   //       const weightData = data
//   //         .map((entry) => ({
//   //           date: entry.recorded_at.slice(0, 10),
//   //           value: entry.weight,
//   //         }))
//   //         .reverse();

//   //       setAllWeightData(weightData);

//   //       // Initially show last 7 days with forward fill
//   //       const today = new Date().toLocaleDateString("en-CA");
//   //       const sevenDaysAgo = new Date();
//   //       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
//   //       const startDate = sevenDaysAgo.toISOString().split("T")[0];

//   //       const filled = forwardFillData(weightData, startDate, today);
//   //       setData(filled);
//   //     } else if (mode === "nutrition") {
//   //       const firstDate = "2024-01-01";
//   //       const today = new Date().toLocaleDateString("en-CA");
//   //       const nutritionData = await MealPlanService.getCalAndMacros(
//   //         firstDate,
//   //         today
//   //       );
//   //       setAllNutritionData(nutritionData);

//   //       const lastSevenDays = nutritionData.slice(-7);
//   //       setData(lastSevenDays);
//   //     }
//   //   } catch (err) {
//   //     console.error("Error fetching progress data: ", err);
//   //     setError("Failed to load data");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (mode === "weight") {
//         const { data } = await api.get("/api/weight-history/");
//         const weightData = data
//           .map((entry) => ({
//             date: entry.recorded_at.slice(0, 10),
//             value: entry.weight,
//           }))
//           .reverse();

//         setAllWeightData(weightData);

//         // Calculate global range for weight
//         if (weightData.length > 0) {
//           const weights = weightData.map((d) => d.value);
//           setGlobalWeightRange({
//             min: Math.min(...weights),
//             max: Math.max(...weights),
//           });
//         }

//         // Initially show last 7 days with forward fill
//         const today = new Date().toLocaleDateString("en-CA");
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
//         const startDate = sevenDaysAgo.toISOString().split("T")[0];

//         const filled = forwardFillData(weightData, startDate, today);
//         setData(filled);
//       } else if (mode === "nutrition") {
//         const firstDate = "2024-01-01";
//         const today = new Date().toLocaleDateString("en-CA");
//         const nutritionData = await MealPlanService.getCalAndMacros(
//           firstDate,
//           today
//         );
//         setAllNutritionData(nutritionData);

//         // Calculate global range for nutrition (calories)
//         if (nutritionData.length > 0) {
//           const allCalories = nutritionData.map(
//             (d) => d.protein * 4 + d.carbs * 4 + d.fat * 9
//           );
//           setGlobalNutritionRange({
//             min: 0, // Always start at 0 for calories
//             max: Math.max(...allCalories),
//           });
//         }

//         const lastSevenDays = nutritionData.slice(-7);
//         setData(lastSevenDays);
//       }
//     } catch (err) {
//       console.error("Error fetching progress data: ", err);
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           padding: "50px",
//           fontFamily: "monospace",
//         }}
//       >
//         <h2>Error</h2>
//         <p>{error}</p>
//         <button
//           onClick={() => {
//             setError(null);
//             fetchData();
//           }}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#c5ced3ff",
//             color: "#000000",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontFamily: "monospace",
//             fontWeight: "bold",
//             fontSize: "15px",
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "20px",
//           fontFamily: "monospace",
//         }}
//       >
//         <h2>Progress tracker</h2>
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             padding: "10px 20px",
//             color: "#000000",
//             border: "none",
//             borderRadius: "5px",
//             fontSize: "16px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontFamily: "monospace",
//           }}
//         >
//           ← Dashboard
//         </button>
//       </div>

//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         {["weight", "nutrition"].map((m) => (
//           <button
//             key={m}
//             onClick={() => setMode(m)}
//             style={{
//               padding: "10px 20px",
//               margin: "0 5px",
//               backgroundColor: mode === m ? "#546E7A" : "#f0f0f0",
//               color: mode === m ? "white" : "#450",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontFamily: "monospace",
//             }}
//           >
//             {m.charAt(0).toUpperCase() + m.slice(1)}
//           </button>
//         ))}
//       </div>

//       {mode === "nutrition" && allNutritionData.length > 0 && (
//         <TimeSlider
//           minDate={allNutritionData[0].date}
//           maxDate={allNutritionData[allNutritionData.length - 1].date}
//           windowSize={7}
//           onRangeChange={(start, end) => {
//             setSliderStart(start);
//             setSliderEnd(end);
//           }}
//         />
//       )}

//       {mode === "weight" && allWeightData.length > 0 && (
//         <TimeSlider
//           minDate={allWeightData[0].date}
//           maxDate={allWeightData[allWeightData.length - 1].date}
//           windowSize={7}
//           onRangeChange={(start, end) => {
//             setWeightSliderStart(start);
//             setWeightSliderEnd(end);
//           }}
//         />
//       )}

//       {/* {viewMode === "chart" ? (
//         mode === "weight" ? (
//           <ProgressChart data={data} label={mode} />
//         ) : (
//           <NutritionChart data={data} />
//         )
//       ) : (
//         <ProgressList data={data} label={mode} />
//       )} */}

//       {viewMode === "chart" ? (
//         mode === "weight" ? (
//           <ProgressChart
//             data={data}
//             label={mode}
//             globalRange={globalWeightRange}
//           />
//         ) : (
//           <NutritionChart data={data} globalRange={globalNutritionRange} />
//         )
//       ) : (
//         <ProgressList data={data} label={mode} />
//       )}
//     </div>
//   );
// }

// export default WeightHistory;
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import ProgressList from "../components/ProgressList";
import MealPlanService from "../services/MealPlanService";
import NutritionChart from "../components/NutritionChart";
import TimeSlider from "../components/TimeSlider";
import ProgressChart from "../components/ProgressChart";

function WeightHistory() {
  const [mode, setMode] = useState("weight");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("chart");
  const [data, setData] = useState([]);
  const [allNutritionData, setAllNutritionData] = useState([]);
  const [allWeightData, setAllWeightData] = useState([]);

  const [sliderStart, setSliderStart] = useState(null);
  const [sliderEnd, setSliderEnd] = useState(null);

  const [globalWeightRange, setGlobalWeightRange] = useState(null);
  const [globalNutritionRange, setGlobalNutritionRange] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [mode]);

  // Nutrition slider - date-based
  useEffect(() => {
    if (
      mode === "nutrition" &&
      sliderStart &&
      sliderEnd &&
      allNutritionData.length > 0
    ) {
      const filtered = allNutritionData.filter(
        (entry) => entry.date >= sliderStart && entry.date <= sliderEnd
      );
      setData(filtered);
    }
  }, [sliderStart, sliderEnd, mode, allNutritionData]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === "weight") {
        const { data } = await api.get("/api/weight-history/");
        const weightData = data
          .map((entry) => ({
            date: entry.recorded_at.split("T")[0], // Better timezone handling
            value: entry.weight,
          }))
          .reverse();

        setAllWeightData(weightData);

        // Calculate global range for weight
        if (weightData.length > 0) {
          const weights = weightData.map((d) => d.value);
          setGlobalWeightRange({
            min: Math.min(...weights),
            max: Math.max(...weights),
          });
        }

        // Initially show last 7 entries (or all if less than 7)
        const lastSeven = weightData.slice(-7);
        setData(lastSeven);
      } else if (mode === "nutrition") {
        const firstDate = "2024-01-01";
        const today = new Date().toLocaleDateString("en-CA");
        const nutritionData = await MealPlanService.getCalAndMacros(
          firstDate,
          today
        );
        setAllNutritionData(nutritionData);

        // Calculate global range for nutrition
        if (nutritionData.length > 0) {
          const allCalories = nutritionData.map(
            (d) => d.protein * 4 + d.carbs * 4 + d.fat * 9
          );
          setGlobalNutritionRange({
            min: 0,
            max: Math.max(...allCalories),
          });
        }

        const lastSevenDays = nutritionData.slice(-7);
        setData(lastSevenDays);
      }
    } catch (err) {
      console.error("Error fetching progress data: ", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Weight slider handler - entry-based (not date-based)
  const handleWeightSliderChange = (startIdx, endIdx) => {
    const sliced = allWeightData.slice(startIdx, endIdx + 1);
    setData(sliced);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          fontFamily: "monospace",
        }}
      >
        <h2>Error</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchData();
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#c5ced3ff",
            color: "#000000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          fontFamily: "monospace",
        }}
      >
        <h2>Progress tracker</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            color: "#000000",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          ← Dashboard
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {["weight", "nutrition"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              backgroundColor: mode === m ? "#546E7A" : "#f0f0f0",
              color: mode === m ? "white" : "#450",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Weight slider - entry-based */}
      {mode === "weight" && allWeightData.length > 1 && (
        <TimeSlider
          minDate={0}
          maxDate={allWeightData.length - 1}
          windowSize={Math.min(7, allWeightData.length)}
          isIndexMode={true}
          allData={allWeightData}
          onRangeChange={handleWeightSliderChange}
        />
      )}

      {/* Nutrition slider - date-based */}
      {mode === "nutrition" && allNutritionData.length > 0 && (
        <TimeSlider
          minDate={allNutritionData[0].date}
          maxDate={allNutritionData[allNutritionData.length - 1].date}
          windowSize={7}
          isIndexMode={false}
          onRangeChange={(start, end) => {
            setSliderStart(start);
            setSliderEnd(end);
          }}
        />
      )}

      {viewMode === "chart" ? (
        mode === "weight" ? (
          <ProgressChart
            data={data}
            label={mode}
            globalRange={globalWeightRange}
          />
        ) : (
          <NutritionChart data={data} globalRange={globalNutritionRange} />
        )
      ) : (
        <ProgressList data={data} label={mode} />
      )}
    </div>
  );
}

export default WeightHistory;
