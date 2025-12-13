import { useState, useEffect } from "react";

function TimeSlider({
  minDate,
  maxDate,
  windowSize = 7,
  onRangeChange,
  isIndexMode = false,
  allData = [],
}) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (isIndexMode) {
      // Entry-based mode for weight
      const maxPosition = Math.max(0, maxDate - minDate + 1 - windowSize);
      setPosition(maxPosition); // Start at most recent

      const startIdx = maxPosition;
      const endIdx = Math.min(startIdx + windowSize - 1, maxDate);
      onRangeChange(startIdx, endIdx);
    } else {
      // Date-based mode for nutrition
      const minTime = new Date(minDate + "T12:00:00").getTime();
      const maxTime = new Date(maxDate + "T12:00:00").getTime();
      const totalDays =
        Math.ceil((maxTime - minTime) / (1000 * 60 * 60 * 24)) + 1;
      const maxPosition = Math.max(0, totalDays - windowSize);

      setPosition(maxPosition);

      const startTime = maxTime - (windowSize - 1) * 24 * 60 * 60 * 1000;
      const start = new Date(startTime).toISOString().split("T")[0];
      const end = new Date(maxTime).toISOString().split("T")[0];
      onRangeChange(start, end);
    }
  }, [minDate, maxDate, windowSize, isIndexMode]);

  const handleSliderChange = (e) => {
    const pos = parseInt(e.target.value);
    setPosition(pos);

    if (isIndexMode) {
      const startIdx = pos;
      const endIdx = Math.min(startIdx + windowSize - 1, maxDate);
      onRangeChange(startIdx, endIdx);
    } else {
      const minTime = new Date(minDate + "T12:00:00").getTime();
      const maxTime = new Date(maxDate + "T12:00:00").getTime();

      const startTime = minTime + pos * 24 * 60 * 60 * 1000;
      const endTime = startTime + (windowSize - 1) * 24 * 60 * 60 * 1000;

      const start = new Date(startTime).toISOString().split("T")[0];
      const end = new Date(Math.min(endTime, maxTime))
        .toISOString()
        .split("T")[0];

      onRangeChange(start, end);
    }
  };

  let displayStart, displayEnd, minDisplay, maxDisplay, maxPosition;

  if (isIndexMode) {
    maxPosition = Math.max(0, maxDate - minDate + 1 - windowSize);
    const startIdx = position;
    const endIdx = Math.min(startIdx + windowSize - 1, maxDate);

    displayStart = allData[startIdx]?.date;
    displayEnd = allData[endIdx]?.date;
    minDisplay = allData[0]?.date;
    maxDisplay = allData[allData.length - 1]?.date;

    if (!displayStart || !displayEnd) return null;
  } else {
    const minTime = new Date(minDate + "T12:00:00").getTime();
    const maxTime = new Date(maxDate + "T12:00:00").getTime();
    const totalDays =
      Math.ceil((maxTime - minTime) / (1000 * 60 * 60 * 24)) + 1;
    maxPosition = Math.max(0, totalDays - windowSize);

    const currentStart = new Date(minTime + position * 24 * 60 * 60 * 1000);
    const currentEnd = new Date(
      Math.min(
        minTime + (position + windowSize - 1) * 24 * 60 * 60 * 1000,
        maxTime
      )
    );

    displayStart = currentStart.toISOString().split("T")[0];
    displayEnd = currentEnd.toISOString().split("T")[0];
    minDisplay = minDate;
    maxDisplay = maxDate;
  }

  return (
    <div style={{ margin: "20px 0", fontFamily: "monospace" }}>
      <div
        style={{ textAlign: "center", marginBottom: "10px", fontSize: "14px" }}
      >
        <strong>
          {new Date(displayStart + "T12:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {" - "}
          {new Date(displayEnd + "T12:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </strong>
      </div>
      <input
        type="range"
        min="0"
        max={maxPosition}
        value={position}
        onChange={handleSliderChange}
        style={{ width: "100%", cursor: "pointer", accentColor: "#afc5cbff" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#665",
          marginTop: "5px",
        }}
      >
        <span>
          {new Date(minDisplay + "T12:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>
          {new Date(maxDisplay + "T12:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default TimeSlider;
