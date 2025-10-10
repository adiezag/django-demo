function WeightList({ entries }) {
  if (!entries || entries.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Weight History List
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Weight (kg)
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              const prevWeight =
                index < entries.length - 1
                  ? entries[index + 1].weight
                  : entry.weight;
              const change = (entry.weight - prevWeight).toFixed(1);

              return (
                <tr key={entry.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "15px", border: "1px solid #ddd" }}>
                    {new Date(entry.recorded_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      textAlign: "center",
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                    }}
                  >
                    {entry.weight}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      textAlign: "center",
                      color:
                        change > 0
                          ? "#f44336"
                          : change < 0
                          ? "#4CAF50"
                          : "#650",
                      border: "1px solid #ddd",
                    }}
                  >
                    {index === entries.length - 1 ? (
                      "—"
                    ) : (
                      <>
                        {change > 0 ? "+" : ""}
                        {change} kg
                        {change > 0 ? " ⬆️" : change < 0 ? " ⬇️" : " ➡️"}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeightList;
