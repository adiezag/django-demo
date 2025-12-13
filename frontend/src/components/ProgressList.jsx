function ProgressList({ data, label }) {
  if (!data || data.length === 0) return null;

  const getUnit = (label) => {
    if (label === "weight") return "kg";
    if (label === "calories") return "cal";
    return "g";
  };
  const unit = getUnit(label);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // console.log("data: ", data);
  // const sortedData = data.reverse();

  console.log("sortedData: ", sortedData);
  return (
    <div
      style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "monospace" }}
    >
      {/* <h3 style={{ textAlign: "center" }}>
        {label.charAt(0).toUpperCase() + label.slice(1)} History
      </h3> */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Date
            </th>
            <th
              style={{
                borderBottom: "1px solid #ccc",
                padding: "8px",
                textAlign: "right",
              }}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)} ({unit})
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, i) => (
            <tr key={i}>
              <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                {new Date(entry.date + "T00:00:00").toLocaleDateString("en-CA")}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "8px",
                  textAlign: "right",
                }}
              >
                {entry.value}
                {/* {unit} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressList;
