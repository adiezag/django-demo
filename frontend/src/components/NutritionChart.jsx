function NutritionChart({ data, globalRange }) {
  if (!data || data.length === 0) return null;

  const chartWidth = 800;
  const chartHeight = 400;
  const padding = 60;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;

  const timestamps = data.map((d) => new Date(d.date + "T00:00:00").getTime());
  const minTime = Math.min(...timestamps);
  const maxTime = Math.max(...timestamps);
  const timeRange = maxTime - minTime || 1;
  const barWidth = Math.min(30, graphWidth / (data.length * 4));

  const barsData = data.map((entry) => {
    const proteinCal = entry.protein * 4;
    const carbsCal = entry.carbs * 4;
    const fatCal = entry.fat * 9;
    const totalCal = proteinCal + carbsCal + fatCal;

    const timestamp = new Date(entry.date + "T00:00:00").getTime();
    // const x = padding + ((timestamp - minTime) / timeRange) * graphWidth;
    const x =
      padding +
      barWidth +
      ((timestamp - minTime) / timeRange) * (graphWidth - barWidth * 2);

    return {
      x,
      date: entry.date,
      proteinCal,
      carbsCal,
      fatCal,
      totalCal,
    };
  });

  // Use global range if provided, otherwise calculate from visible data
  const maxCal = globalRange
    ? globalRange.max
    : Math.max(...barsData.map((b) => b.totalCal));
  const yScale = graphHeight / (maxCal || 1);

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
        fontFamily: "monospace",
      }}
    >
      <h3>Nutrition (calories)</h3>
      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ border: "1px solid #eee" }}
      >
        {/* Horizontal grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const calVal = (maxCal / 4) * (4 - i);
          const y = padding + (i / 4) * graphHeight;
          return (
            <g key={`grid-${i}`}>
              <line
                x1={padding}
                y1={y}
                x2={padding + graphWidth}
                y2={y}
                stroke="#f0f0f0"
              />
              <text
                x={padding - 10}
                y={y + 5}
                textAnchor="end"
                fontSize="12"
                fill="#665"
              >
                {Math.round(calVal)}
              </text>
            </g>
          );
        })}

        {/* Stacked bars */}
        {barsData.map((bar, i) => {
          const baseY = chartHeight - padding;

          const proteinHeight = Math.max(0, bar.proteinCal * yScale);
          const proteinY = baseY - proteinHeight;

          const carbsHeight = Math.max(0, bar.carbsCal * yScale);
          const carbsY = proteinY - carbsHeight;

          const fatHeight = Math.max(0, bar.fatCal * yScale);
          const fatY = carbsY - fatHeight;

          // Skip rendering if values are invalid
          if (!isFinite(fatY) || !isFinite(proteinY) || !isFinite(carbsY)) {
            return null;
          }
          // const baseY = chartHeight - padding;

          // const proteinHeight = bar.proteinCal * yScale;
          // const proteinY = baseY - proteinHeight;

          // const carbsHeight = bar.carbsCal * yScale;
          // const carbsY = proteinY - carbsHeight;

          // const fatHeight = bar.fatCal * yScale;
          // const fatY = carbsY - fatHeight;

          return (
            <g key={i}>
              <rect
                x={bar.x - barWidth / 2}
                y={proteinY}
                width={barWidth}
                height={proteinHeight}
                fill="#42A5F5"
              >
                <title>Protein: {Math.round(bar.proteinCal)} cal</title>
              </rect>

              <rect
                x={bar.x - barWidth / 2}
                y={carbsY}
                width={barWidth}
                height={carbsHeight}
                fill="#FFA726"
              >
                <title>Carbs: {Math.round(bar.carbsCal)} cal</title>
              </rect>

              <rect
                x={bar.x - barWidth / 2}
                y={fatY}
                width={barWidth}
                height={fatHeight}
                fill="#FF7043"
              >
                <title>Fat: {Math.round(bar.fatCal)} cal</title>
              </rect>

              <text
                x={bar.x}
                y={fatY - 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#333"
              >
                {Math.round(bar.totalCal)}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {barsData.map((bar, i) => {
          if (i === 0 || i === barsData.length - 1) {
            return (
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
            );
          }
          const prevX = barsData[i - 1].x;
          if (bar.x - prevX > 80) {
            return (
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
            );
          }
          return null;
        })}

        {/* Legend */}
        {/* <g transform={`translate(${chartWidth - 150}, ${padding})`}>
          <rect x="0" y="0" width="15" height="15" fill="#42A5F5" />
          <text x="20" y="12" fontSize="12" fill="#665">
            Protein
          </text>

          <rect x="0" y="20" width="15" height="15" fill="#FFA726" />
          <text x="20" y="32" fontSize="12" fill="#665">
            Carbs
          </text>

          <rect x="0" y="40" width="15" height="15" fill="#FF7043" />
          <text x="20" y="52" fontSize="12" fill="#665">
            Fat
          </text>
        </g> */}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "10px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: 12, height: 12, background: "#42A5F5" }}></div>
          <span>Protein</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: 12, height: 12, background: "#FFA726" }}></div>
          <span>Carbs</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: 12, height: 12, background: "#FF7043" }}></div>
          <span>Fat</span>
        </div>
      </div>
    </div>
  );
}

export default NutritionChart;
