import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ProfileSetup from "../components/ProfileSetup";
import Dashboard from "../components/Dashboard";
import "../styles/Home.css";
function Home() {
  // const [notes, setNotes] = useState([]);
  // const [content, setContent] = useState("");
  // const [title, setTitle] = useState("");
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

  return <Dashboard />;
}
export default Home;
