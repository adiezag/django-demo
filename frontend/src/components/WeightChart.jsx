function WeightChart({ entries }) {
  if (!entries || entries.length === 0) return null;

  // Prepare data for chart (reverse order for chronological display)
  const chartData = entries
    .slice()
    .reverse()
    .map((entry, index) => ({
      ...entry,
      date: new Date(entry.recorded_at).toLocaleDateString(),
      shortDate: new Date(entry.recorded_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

  // Simple SVG chart implementation
  const chartWidth = 800;
  const chartHeight = 400;
  const padding = 60;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;

  const weights = chartData.map((d) => d.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const weightRange = maxWeight - minWeight || 1; // Prevent division by zero

  // Create SVG points
  const points = chartData.map((entry, index) => {
    const x = padding + (index / (chartData.length - 1 || 1)) * graphWidth;
    const y =
      padding + ((maxWeight - entry.weight) / weightRange) * graphHeight;
    return { x, y, ...entry };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Weight Progress Chart
      </h3>

      <div style={{ textAlign: "center", overflowX: "auto" }}>
        <svg
          width={chartWidth}
          height={chartHeight}
          style={{ border: "1px solid #eee" }}
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`hgrid-${i}`}
              x1={padding}
              y1={padding + (i / 4) * graphHeight}
              x2={padding + graphWidth}
              y2={padding + (i / 4) * graphHeight}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => (
            <text
              key={`ylabel-${i}`}
              x={padding - 10}
              y={padding + (i / 4) * graphHeight + 5}
              textAnchor="end"
              fontSize="12"
              fill="#666"
            >
              {Math.round(maxWeight - (i / 4) * weightRange)}kg
            </text>
          ))}

          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#4CAF50"
                stroke="white"
                strokeWidth="2"
              />
              <title>{`${point.shortDate}: ${point.weight}kg`}</title>
            </g>
          ))}

          {/* X-axis labels */}
          {points.map(
            (point, index) =>
              index % Math.ceil(points.length / 8) === 0 && (
                <text
                  key={`xlabel-${index}`}
                  x={point.x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#650"
                >
                  {point.shortDate}
                </text>
              )
          )}
        </svg>
      </div>
    </div>
  );
}

export default WeightChart;
