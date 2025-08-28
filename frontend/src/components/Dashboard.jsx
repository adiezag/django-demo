import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Profile",
      description: "View and update your profile information",
      action: () => navigate("/profile"),
      color: "#4CAF50",
    },
    {
      title: "Meal Plans",
      description: "Get AI personalized meal recommendations",
      action: () => navigate("/meal-plans"),
      color: "#2196F3",
    },
    {
      title: "Weight Tracking",
      description: "Track your weight progress over time",
      action: () => navigate("/weight-history"),
      color: "#FF9800",
    },
    {
      title: "Settings",
      description: "App settings and preferences",
      action: () => navigate("/settings"),
      color: "#9C27B0",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Welcome back!</h1>
        <p style={{ color: "#560", fontSize: "18px" }}>
          What would you like to do today?
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              border: `3px solid ${item.color}`,
              textAlign: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ color: item.color, marginBottom: "10px" }}>
              {item.title}
            </h3>
            <p style={{ color: "#666", margin: "0" }}>{item.description}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <h3>Quick Stats</h3>
        <p>Your personalized meal plans and progress tracking are ready!</p>
        <button
          onClick={() => navigate("/meal-plans")}
          style={{
            padding: "10px 30px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Get Meal Plan
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
