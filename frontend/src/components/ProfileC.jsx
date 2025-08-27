import React, { useState } from "react";

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
          <label>Height (cm): </label>
          <input
            type="number"
            name="height"
            value={editData.height}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Weight (kg): </label>
          <input
            type="number"
            name="weight"
            value={editData.weight}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Date of Birth: </label>
          <input
            type="date"
            name="date_of_birth"
            value={editData.date_of_birth}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Activity level: </label>
          <select
            name="activity_level"
            value={editData.activity_level}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Goal: </label>
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
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
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
              borderRadius: "4px",
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
        <strong>Activity level:</strong> {profile.activity_level}
      </p>
      <p>
        <strong>Goal:</strong> {profile.goal}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileC;
