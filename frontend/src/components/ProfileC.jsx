import React, { useState } from "react";
import {
  getActivityLevelDisplay,
  getGoalDisplay,
} from "../utils/displayHelpers";

function ProfileC({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    height: profile.height,
    weight: profile.weight,
    date_of_birth: profile.date_of_birth,
    activity_level: profile.activity_level,
    goal: profile.goal,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate(editData);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      height: profile.height,
      weight: profile.weight,
      date_of_birth: profile.date_of_birth,
      activity_level: profile.activity_level,
      goal: profile.goal,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20x",
          borderRadius: "8px",
        }}
      >
        <h3>Edit Profile</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Height (cm): </strong>
          </label>
          <input
            type="number"
            name="height"
            value={editData.height}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Weight (kg):</strong>{" "}
          </label>
          <input
            type="number"
            name="weight"
            value={editData.weight}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        {/* <div style={{ marginBottom: "10px" }}>
          <label>Date of Birth: </label>
          <input
            type="date"
            name="date_of_birth"
            value={editData.date_of_birth}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div> */}

        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Activity level: </strong>
          </label>
          <select
            name="activity_level"
            value={editData.activity_level}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            {/* <option value="">-- Select your activity level --</option> */}
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Light (light exercise 1-3 days/week)</option>
            <option value="moderate">
              Moderate (moderate exercise 3-5 days/week)
            </option>
            <option value="active">
              Active (heavy exercise 6-7 days/week)
            </option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Goal: </strong>
          </label>
          <select
            name="goal"
            value={editData.goal}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#546E7A",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Saving" : "Save"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
  console.log("test");
  return (
    <div
      style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}
    >
      <h3>Profile information</h3>
      <p>
        <strong>Height:</strong> {profile.height} cm
      </p>
      <p>
        <strong>Weight:</strong> {profile.weight} kg
      </p>
      <p>
        <strong>Age:</strong> {profile.age}
      </p>
      <p>
        <strong>Activity level:</strong>{" "}
        {getActivityLevelDisplay(profile.activity_level)}
      </p>
      <p>
        <strong>Goal:</strong> {getGoalDisplay(profile.goal)}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#546E7A",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileC;
