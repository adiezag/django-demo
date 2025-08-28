function MealPlanDisp({ data }) {
  const mealPlanText = data?.output;
  return (
    <div>
      <p>Meal plan: </p>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflow: "auto",
        }}
      >
        {mealPlanText}
      </pre>
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

export default MealPlanDisp;
