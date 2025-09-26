function WeightStats({ entries }) {
  if (!entries || entries.length === 0) return null;

  const currentWeight = entries[0]?.weight; // Most recent (first in array due to ordering)
  const startWeight = entries[entries.length - 1]?.weight; // Oldest entry
  const weightChange = currentWeight - startWeight;
  const totalEntries = entries.length;

  // Calculate trend (last 7 entries if available)
  const recentEntries = entries.slice(0, Math.min(7, entries.length));
  const recentChange =
    recentEntries.length > 1
      ? recentEntries[0].weight - recentEntries[recentEntries.length - 1].weight
      : 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "3px solid #00796B",
        }}
      >
        <h3 style={{ color: "#00796B", margin: "0 0 10px 0" }}>
          Current Weight
        </h3>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
            color: "#333",
          }}
        >
          {currentWeight} kg
        </p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: `3px solid ${weightChange >= 0 ? "#D84315" : "#2196F3"}`,
        }}
      >
        <h3 style={{ color: "#D84315", margin: "0 0 10px 0" }}>Recent Trend</h3>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
            color: "#333",
          }}
        >
          {recentChange > 0 ? "+" : ""}
          {recentChange} kg
        </p>
        <small style={{ color: "#667" }}>Last 7 entries</small>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "3px solid #607D8B",
        }}
      >
        <h3 style={{ color: "#607D8B", margin: "0 0 10px 0" }}>
          Total Entries
        </h3>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
            color: "#333",
          }}
        >
          {totalEntries}
        </p>
        <small style={{ color: "#665" }}>Weight records</small>
      </div>
    </div>
  );
}

export default WeightStats;
