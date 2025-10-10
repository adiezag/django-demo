import { useState, useEffect } from "react";
import api from "../api";
import WeightChart from "../components/WeightChart";
import WeightList from "../components/WeightList";
import WeightStats from "../components/WeightStats";
import { useNavigate } from "react-router-dom";

function WeightHistory() {
  const [weightEntries, setWeightEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("chart"); // chart or list
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeightHistory();
  }, []);
  const fetchWeightHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/weight-history/");
      setWeightEntries(data);
    } catch (err) {
      console.error("Error fetching weight history: ", err);
      setError("Failed to load weight history");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading weight history...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button
          onClick={fetchWeightHistory}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  if (weightEntries.length === 0) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Weight Tracking</h2>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "40px",
            borderRadius: "10px",
            border: "2px dashed #ddd",
          }}
        >
          <h3>No weight data yet</h3>
          <p>
            Your weight history will appear here once you update your profile.
          </p>
          <p>Go to your profile and update your weight to start tracking!</p>
          <button
            onClick={() => (window.location.href = "/profile")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}></h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#546E7A",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Dashboard
        </button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2>Weight Tracking</h2>
        <p style={{ color: "#450" }}>Track your weight progress over time</p>
      </div>

      {/* View Mode Toggle */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div
          style={{
            display: "inline-flex",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            padding: "4px",
          }}
        >
          <button
            onClick={() => setViewMode("chart")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: viewMode === "chart" ? "#546E7A" : "transparent",
              color: viewMode === "chart" ? "white" : "#450",
              cursor: "pointer",
              fontWeight: viewMode === "chart" ? "bold" : "normal",
            }}
          >
            📈 Chart View
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: viewMode === "list" ? "#546E7A" : "transparent",
              color: viewMode === "list" ? "white" : "#450",
              cursor: "pointer",
              fontWeight: viewMode === "list" ? "bold" : "normal",
            }}
          >
            📋 List View
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <WeightStats entries={weightEntries} />

      {/* Main Content */}
      {viewMode === "chart" ? (
        <WeightChart entries={weightEntries} />
      ) : (
        <WeightList entries={weightEntries} />
      )}
    </div>
  );
}

export default WeightHistory;
