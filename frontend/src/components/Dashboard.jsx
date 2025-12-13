import { useNavigate } from "react-router-dom";
import MacroProgress from "./MacroProgress";
import { useState } from "react";
import { useEffect } from "react";
import MealPlanService from "../services/MealPlanService";
function Dashboard() {
  const navigate = useNavigate();
  const [macros, setMacros] = useState(null);
  const [loading, setLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchMacros = async () => {
      try {
        const todayLocal = new Date().toLocaleDateString("en-CA");
        const data = await MealPlanService.getMacros(todayLocal);
        setMacros(data);
      } catch (error) {
        console.error("Error fetching macros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMacros();
  }, []);

  const menuItems = [
    {
      title: "My profile",
      description: "View and update your profile information",
      action: () => navigate("/profile"),
      color: "#000000",
    },
    {
      title: "AI nutrition assistant",
      description: "Get AI personalized meal recommendations",
      action: () => navigate("/meal-plans"),
      color: "#000000",
    },
    {
      title: "Progress tracker",
      description: "Track your weight and macros progress over time",
      action: () => navigate("/weight-history"),
      color: "#000000",
    },
    // {
    //   title: "Settings",
    //   description: "App settings and preferences",
    //   action: () => navigate("/settings"),
    //   color: "#9C27B0",
    // },
    {
      title: "Daily meals",
      description: "View and update your meals",
      action: () => navigate("/meals"),
      color: "#000000",
    },
    // {
    //   title: "Calculator",
    //   description: "Calculate weight bar",
    //   action: () => navigate("/calculator"),
    //   color: "#d94545ff",
    // },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontFamily: "monospace",
        }}
      >
        <h1>Welcome back!</h1>
        <p style={{ marginTop: "8px", fontSize: "16px" }}>
          {/* <h2>
            <strong>Dashboard</strong>
          </h2> */}
        </p>
      </header>
      <div style={{ marginBottom: "40px" }}>
        {/* <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Today's Progress
        </h2> */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {macros ? (
            <>
              <MacroProgress macros={macros} />
              {/* <button
                onClick={() => navigate("/meals")}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "10px",
                  backgroundColor: "#2e707dff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View Today's Meals
              </button> */}
            </>
          ) : (
            <div>Loading macros...</div>
          )}
        </div>
      </div>

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
              border: "3px solid",
              textAlign: "center",
              fontFamily: "monospace",
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
            <p style={{ color: "#665", margin: "0" }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
