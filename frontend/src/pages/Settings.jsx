import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Button at top right */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
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

      {/* Centered message */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <h2 style={{ margin: 0 }}>⚠️ Feature coming soon</h2>
      </div>
    </div>
  );
}

export default Settings;
