function ProgressChart({ data, label, globalRange }) {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          fontFamily: "monospace",
        }}
      >
        <p>No data available for this time period</p>
      </div>
    );
  }

  const getUnit = (label) => {
    if (label === "weight") return "kg";
    if (label === "calories") return "cal";
    return "g";
  };

  const unit = getUnit(label);

  const getColor = (label) => {
    switch (label) {
      case "weight":
        return "#007579ff";
      default:
        return "#607D8B";
    }
  };

  const color = getColor(label);

  const chartWidth = 800;
  const chartHeight = 400;
  const padding = 60;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;

  // Helper function to round to nice intervals
  const getNiceMax = (value) => {
    if (value === 0 || !isFinite(value)) return 100; // Handle edge cases

    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / magnitude;

    let niceNumber;
    if (normalized <= 1) niceNumber = 1;
    else if (normalized <= 2) niceNumber = 2;
    else if (normalized <= 5) niceNumber = 5;
    else niceNumber = 10;

    return niceNumber * magnitude;
  };

  // Use global range if provided
  let minVal, maxVal, baseline;

  if (globalRange) {
    minVal = globalRange.min;
    maxVal = globalRange.max;
    baseline = label === "weight" ? Math.floor(minVal - 5) : 0;

    // Round maxVal to nice number
    const niceMax = getNiceMax(maxVal - baseline);
    maxVal = baseline + niceMax;
  } else {
    const values = data.map((d) => d.value);
    minVal = Math.min(...values);
    maxVal = Math.max(...values);
    baseline = label === "weight" ? Math.floor(minVal - 5) : 0;
  }

  const range = maxVal - baseline || 1;

  // Bar positioning
  const barWidth = Math.min(80, graphWidth / (data.length * 2.5));
  const spacing = graphWidth / data.length;

  const bars = data.map((entry, index) => {
    const x = padding + spacing * index + spacing / 2;
    const barHeight = Math.max(
      0,
      ((entry.value - baseline) / range) * graphHeight
    );
    const y = chartHeight - padding - barHeight;

    return {
      x,
      y,
      height: barHeight,
      ...entry,
    };
  });

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
        fontFamily: "monospace",
      }}
    >
      <h3>
        {label.charAt(0).toUpperCase() + label.slice(1)} ({unit})
      </h3>
      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ border: "1px solid #eee" }}
      >
        {/* Horizontal grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`hgrid-${i}`}
            x1={padding}
            y1={padding + (i / 4) * graphHeight}
            x2={padding + graphWidth}
            y2={padding + (i / 4) * graphHeight}
            stroke="#f0f0f0"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const val = baseline + ((4 - i) / 4) * range;
          return (
            <text
              key={`ylabel-${i}`}
              x={padding - 10}
              y={padding + (i / 4) * graphHeight + 5}
              textAnchor="end"
              fontSize="12"
              fill="#665"
            >
              {Math.round(val)}
              {/* {unit} */}
            </text>
          );
        })}

        {/* Bars */}
        {/* {bars.map((bar, i) => (
          <rect
            key={i}
            x={bar.x - barWidth / 2}
            y={bar.y}
            width={barWidth}
            height={bar.height}
            fill={color}
            stroke="white"
            strokeWidth="1"
          >
            <title>{`${bar.date}: ${bar.value}${unit}`}</title>
          </rect>
        ))} */}

        {bars.map((bar, i) => {
          // Skip if invalid
          if (!isFinite(bar.height) || !isFinite(bar.y) || bar.height < 0) {
            return null;
          }

          return (
            <rect
              key={i}
              x={bar.x - barWidth / 2}
              y={bar.y}
              width={barWidth}
              height={bar.height}
              fill={color}
              stroke="white"
              strokeWidth="1"
            >
              <title>{`${bar.date}: ${bar.value}${unit}`}</title>
            </rect>
          );
        })}

        {/* X-axis labels */}
        {bars.map((bar, i) => (
          <text
            key={`xlabel-${i}`}
            x={bar.x}
            y={chartHeight - 10}
            textAnchor="middle"
            fontSize="11"
            fill="#665"
          >
            {new Date(bar.date + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default ProgressChart;
