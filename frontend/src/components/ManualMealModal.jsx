import React, { useState } from "react";
import MealPlanService from "../services/MealPlanService";

function ManualMealModal({ isOpen, onClose, onSave }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [mealDescription, setMealDescription] = useState("");
  const [mealType, setMealType] = useState("");

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");

  const createMealPayload = () => ({
    meal_description: mealDescription,
    meal_type: mealType,
    date: new Date().toLocaleDateString("en-CA"),
    calories: Number(calories) || 0,
    protein: Number(protein) || 0,
    carbs: Number(carbs) || 0,
    fat: Number(fat) || 0,
    source: "manual",
    notes: notes || "",
  });

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: isMinimized ? "200px" : "400px",
        height: isMinimized ? "40px" : "auto",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "16px",
        zIndex: 1000,
        fontFamily: "monospace",
      }}
    >
      {isMinimized ? (
        <div
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
          onClick={() => setIsMinimized(false)}
        >
          Manual Meal (click to expand)
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "monospace",
            }}
          >
            <h3>New meal</h3>
            <div>
              <button onClick={() => setIsMinimized(true)}>_</button>
              <button onClick={onClose}>X</button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontFamily: "monospace",
            }}
          >
            <input
              type="text"
              style={{ fontFamily: "monospace" }}
              placeholder="e.g., 2 eggs and 1 slice of bacon"
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
            />
            <select
              value={mealType}
              style={{ fontFamily: "monospace" }}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="" style={{ fontFamily: "monospace" }}>
                Select meal type
              </option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
            {/* <input
              type="text"
              placeholder="Portion (e.g., 2 slices)"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
            /> */}
            <input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              style={{ fontFamily: "monospace" }}
            />
            <input
              type="number"
              placeholder="Protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              style={{ fontFamily: "monospace" }}
            />
            <input
              type="number"
              placeholder="Carbs"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              style={{ fontFamily: "monospace" }}
            />
            <input
              type="number"
              placeholder="Fat"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              style={{ fontFamily: "monospace" }}
            />
            <input
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ fontFamily: "monospace" }}
            />
          </div>

          <button
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              if (!mealDescription) {
                alert("Please enter a meal description first:");
                return;
              }

              const payload = createMealPayload();
              try {
                // save the meal inmediately via backend
                await MealPlanService.addMeal(payload);
                //alert(`Meal "${payload.name}" saved successsfully!`);
                if (onSave) onSave();
                //onClose();
                setMealDescription("");
                setMealType("");
                setCalories("");
                setProtein("");
                setCarbs("");
                setFat("");
                onClose();
                //close modal
                // setIsManualMealModalOpen(false);
                alert(`Meal saved successfully`);
              } catch (error) {
                console.error("Failed to save manual meal: ", error);
                alert("Failed to save meal. Please try again.");
              } finally {
                setSaving(false);
              }
            }}
            style={{
              marginTop: "12px",
              padding: "8px",
              backgroundColor: "#bacbbbff",
              color: "#000000",
              fontFamily: "monospace",
            }}
          >
            {saving ? "Saving..." : "Add Meal"}
          </button>
          <button
            onClick={async () => {
              if (!mealDescription) {
                alert("Please enter a meal description first.");
                return;
              }

              try {
                const data = await MealPlanService.estimateNutrition(
                  mealDescription
                );

                setCalories(String(data.calories || ""));
                setProtein(String(data.protein) || "");
                setCarbs(String(data.carbs) || "");
                setFat(String(data.fat) || "");
              } catch (err) {
                console.error("Estimate nutrition failed: ", err);
                alert("Failed to estimate nutrition. Please try again");
              }
            }}
            style={{
              marginTop: "12px",
              padding: "8px",
              backgroundColor: "#6bb1eaff",
              color: "#000000",
              fontFamily: "monospace",
            }}
          >
            Estimate Nutrition
          </button>
        </div>
      )}
    </div>
  );
}

export default ManualMealModal;
