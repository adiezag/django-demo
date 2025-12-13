import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MealPlanService from "../services/MealPlanService";

// Sortable meal item component
function SortableMealItem({ meal, onToggleEaten, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: meal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: meal.is_eaten ? "#e8f5e9" : "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          fontFamily: "monospace",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "8px",
              fontFamily: "monospace",
            }}
          >
            {meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1)}
          </div>
          <div style={{ marginBottom: "8px", fontFamily: "monospace" }}>
            {meal.meal_description}
          </div>
          <div
            style={{ fontSize: "14px", color: "#665", fontFamily: "monospace" }}
          >
            {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs
            | {meal.fat}g fat
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            fontFamily: "monospace",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            <input
              type="checkbox"
              checked={meal.is_eaten}
              onChange={(e) => {
                onToggleEaten(meal.id, e.target.checked);
              }}
            />
            {/* <span style={{ fontSize: "14px" }}>Eaten</span> */}
          </label>

          <button
            onClick={() => {
              onDelete(meal.id);
            }}
            disabled={meal.is_eaten}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              backgroundColor: meal.is_eaten ? "#ccc" : "#f44336",
              color: "white",
              cursor: meal.is_eaten ? "not-allowed" : "pointer",
              fontFamily: "monospace",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function MealsList({ selectedDate, onMealChange, refreshTrigger }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchMeals();
  }, [selectedDate, refreshTrigger]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data = await MealPlanService.getMeals(selectedDate);
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = meals.findIndex((m) => m.id === active.id);
      const newIndex = meals.findIndex((m) => m.id === over.id);

      const newMeals = arrayMove(meals, oldIndex, newIndex);

      const updatedMeals = newMeals.map((meal, index) => ({
        id: meal.id,
        order: index + 1,
      }));

      setMeals(newMeals);

      try {
        await MealPlanService.reorderMeals(updatedMeals);
      } catch (error) {
        console.error("Error reordering meals:", error);
        fetchMeals();
      }
    }
  };

  const handleToggleEaten = async (mealId, isEaten) => {
    try {
      await MealPlanService.updateMeal(mealId, { is_eaten: isEaten });
      setMeals(
        meals.map((m) => (m.id === mealId ? { ...m, is_eaten: isEaten } : m))
      );
      if (onMealChange) onMealChange(); // Notify parent to refresh macros
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  const handleDelete = async (mealId) => {
    if (!window.confirm("Delete this meal?")) return;

    try {
      await MealPlanService.deleteMeal(mealId);
      fetchMeals();
      if (onMealChange) onMealChange(); // Notify parent to refresh macros
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px", fontFamily: "monospace" }}>
      <h3>Meals</h3>
      {loading ? (
        <div>Loading meals...</div>
      ) : meals.length === 0 ? (
        <div>No meals logged for this date.</div>
      ) : (
        <div style={{ fontFamily: "monospace" }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            style={{ fontFamily: "monospace" }}
          >
            <SortableContext
              items={meals.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
              style={{ fontFamily: "monospace" }}
            >
              {meals.map((meal) => (
                <SortableMealItem
                  key={meal.id}
                  meal={meal}
                  onToggleEaten={handleToggleEaten}
                  onDelete={handleDelete}
                  style={{ fontFamily: "monospace" }}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}

export default MealsList;
