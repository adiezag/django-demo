import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MacroProgress from "../components/MacroProgress";
import MacroSnapshot from "../components/MacroSnapshot";
import MealsList from "../components/MealsList";
import ManualMealModal from "../components/ManualMealModal";
import MealPlanService from "../services/MealPlanService";

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function MealsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [macros, setMacros] = useState(null);
  const [isManualMealModalOpen, setIsManualMealModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const isToday = selectedDate === getLocalDate();

  useEffect(() => {
    fetchMacros();
  }, [selectedDate, refreshTrigger]);

  async function fetchMacros() {
    try {
      const data = await MealPlanService.getMacros(selectedDate);
      setMacros(data);
    } catch (err) {
      console.error("Failed to load macros:", err);
      setMacros(null);
    }
  }

  const handleMealSaved = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header with buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          fontFamily: "monospace",
        }}
      >
        <h2>Daily meals</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              // backgroundColor: "#546E7A",
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
      </div>

      {/* Date Selector */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
      </div>

      {/* Macros Section */}
      {macros &&
        (isToday ? (
          <MacroProgress macros={macros} />
        ) : (
          <MacroSnapshot macros={macros.consumed} />
        ))}

      {/* Meals Section */}
      <br></br>
      {isToday && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setIsManualMealModalOpen(true)}
            style={{
              padding: "10px 20px",
              // backgroundColor: "#546E7A",
              color: "#000000",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            + Add meal
          </button>
        </div>
      )}
      <MealsList
        selectedDate={selectedDate}
        onMealChange={handleMealSaved}
        refreshTrigger={refreshTrigger}
      />

      {/* Manual Meal Modal */}
      {isManualMealModalOpen && (
        <ManualMealModal
          isOpen={isManualMealModalOpen}
          onClose={() => setIsManualMealModalOpen(false)}
          onSave={handleMealSaved}
        />
      )}
    </div>
  );
}

export default MealsPage;
