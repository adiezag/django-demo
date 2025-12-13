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
          fontFamily: "monospace",
        }}
      >
        <h3>Edit profile</h3>
        <div
          style={{
            marginBottom: "10px",
            fontFamily: "monospace",
            fontSize: "15px",
          }}
        >
          <label>
            <strong>Height (cm): </strong>
          </label>
          <input
            type="number"
            name="height"
            value={editData.height}
            onChange={handleInputChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontFamily: "monospace",
            }}
          />
        </div>

        <div
          style={{
            marginBottom: "10px",
            fontFamily: "monospace",
            fontSize: "15px",
          }}
        >
          <label>
            <strong>Weight (kg):</strong>{" "}
          </label>
          <input
            type="number"
            name="weight"
            value={editData.weight}
            onChange={handleInputChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontFamily: "monospace",
            }}
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

        <div
          style={{
            marginBottom: "10px",
            fontFamily: "monospace",
            fontSize: "15px",
          }}
        >
          <label>
            <strong>Activity level: </strong>
          </label>
          <select
            name="activity_level"
            value={editData.activity_level}
            onChange={handleInputChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            {/* <option value="">-- Select your activity level --</option> */}
            <option value="sedentary" style={{ fontFamily: "monospace" }}>
              Sedentary (little to no exercise)
            </option>
            <option value="light" style={{ fontFamily: "monospace" }}>
              Light (light exercise 1-3 days/week)
            </option>
            <option value="moderate" style={{ fontFamily: "monospace" }}>
              Moderate (moderate exercise 3-5 days/week)
            </option>
            <option value="active" style={{ fontFamily: "monospace" }}>
              Active (heavy exercise 6-7 days/week)
            </option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "20px",
            fontFamily: "monospace",
            fontSize: "15px",
          }}
        >
          <label>
            <strong>Goal: </strong>
          </label>
          <select
            name="goal"
            value={editData.goal}
            onChange={handleInputChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            <option value="lose" style={{ fontFamily: "monospace" }}>
              Lose weight
            </option>
            <option value="maintain" style={{ fontFamily: "monospace" }}>
              Maintain weight
            </option>
            <option value="gain" style={{ fontFamily: "monospace" }}>
              Gain weight
            </option>
          </select>
        </div>
        <div>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#c5ced3ff",
              color: "#000000",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontFamily: "monospace",
            }}
          >
            {isLoading ? "Saving" : "Save"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ed372aff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontFamily: "monospace",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        fontFamily: "monospace",
        fontsize: "20px",
      }}
    >
      {/* <h3 style={{ fontFamily: "monospace", fontSize: "18px" }}>
        Profile information
      </h3> */}
      <p style={{ fontFamily: "monospace", fontSize: "15px" }}>
        <strong>Height:</strong> {profile.height} cm
      </p>
      <p style={{ fontFamily: "monospace", fontSize: "15px" }}>
        <strong>Weight:</strong> {profile.weight} kg
      </p>
      <p style={{ fontFamily: "monospace", fontSize: "15px" }}>
        <strong>Age:</strong> {profile.age}
      </p>
      <p style={{ fontFamily: "monospace", fontSize: "15px" }}>
        <strong>Activity level:</strong>{" "}
        {getActivityLevelDisplay(profile.activity_level)}
      </p>
      <p style={{ fontFamily: "monospace", fontSize: "15px" }}>
        <strong>Goal:</strong> {getGoalDisplay(profile.goal)}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: "10px 20px",
          // backgroundColor: "#546E7A",
          color: "#000000",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "10px",
          fontFamily: "monospace",
        }}
      >
        Edit profile
      </button>
    </div>
  );
}

export default ProfileC;
