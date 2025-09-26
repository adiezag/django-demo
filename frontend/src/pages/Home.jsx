import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ProfileSetup from "../components/ProfileSetup";
import Dashboard from "../components/Dashboard";
import "../styles/Home.css";
import { Logout } from "../utils/displayHelpers";

function Home() {
  // const [notes, setNotes] = useState([]);
  // const [content, setContent] = useState("");
  // const [title, setTitle] = useState("");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [activity_level, setActivity_level] = useState("");
  const [goal, setGoal] = useState("");

  const [profileExists, setProfileExists] = useState(null); // null=loading, true/false=known state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      await api.get("/api/profile/");
      setProfileExists(true);
    } catch (err) {
      if (err.response?.status === 400) {
        setProfileExists(false);
      } else {
        console.error("Error checking profile: ", err);
        setProfileExists(false);
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!profileExists) {
    return <ProfileSetup onProfileCreated={() => setProfileExists(true)} />;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
        }}
      >
        <button
          onClick={handleLogout}
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
          Logout
        </button>
      </div>
      <div>
        <Dashboard />;
      </div>
    </div>
  );
}
export default Home;
