import ProfileC from "../components/ProfileC";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  console.log(profile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/profile/");
      // const profileList = Array.isArray(data) ? data : [data];

      setProfile(data);

      console.log("Profile data: ", data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 404) {
        setProfile(null);
      } else {
        setError(
          "Failed to load profile: " +
            (err.response?.data?.error || err.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const { data } = await api.patch("/api/profile/", updatedData); // Using PATCH for partial updates
      setProfile(data); // Update the profile state with new data
      alert("Profile updated successfully!");
      return data;
    } catch (err) {
      console.error("Error updating profile:", err);
      throw new Error(err.response?.data?.error || "Failed to update profile");
    }
  };
  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={getProfile}>Retry</button>
      </div>
    );
  }

  if (!profile && !error) {
    return (
      <div>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <h2>User's Profile</h2>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>No profile found. Please create a profile first.</p>
            <button
              onClick={() => (window.location.href = "/create-profile")} // Adjust this to your create profile route
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Create Profile
            </button>
          </div>
        </div>

        {/* <button onClick={() => navigate("/")}>Home</button> */}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
      <h2>User's profile</h2>

      <ProfileC profile={profile} onUpdate={updateProfile} />
    </div>
  );
}
export default Profile;
