function MealCard({ meal, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? "#dfd0ff" : "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "12px",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
        {meal.meal_type}
      </div>

      <div style={{ color: "#555", marginBottom: "6px" }}>
        {meal.meal_description}
      </div>

      <div style={{ fontSize: "14px" }}>
        <strong>Macros:</strong>
        <div>Calories: {meal.calories}</div>
        <div>Protein: {meal.protein}g</div>
        <div>Carbs: {meal.carbs}g</div>
        <div>Fat: {meal.fat}g</div>
      </div>
    </div>
  );
}

export default MealCard();
