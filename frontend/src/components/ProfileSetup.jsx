import { useState } from "react";
import api from "../api";
function ProfileSetup({ onProfileCreated }) {
  // At the top of ProfileSetup function, add:
  console.log(
    "onProfileCreated prop:",
    onProfileCreated,
    typeof onProfileCreated
  );
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    date_of_birth: "",
    activity_level: "",
    goal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post("/api/profile/", {
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        date_of_birth: formData.date_of_birth,
        activity_level: formData.activity_level,
        goal: formData.goal,
      });
      if (response.status === 201) {
        alert("Welcome! Your profile has been created successfully!");
        // if (onProfileCreated && typeof onProfileCreated === "function") {
        //   onProfileCreated(); // This will trigger re-render to show Dashboard
        // }
        onProfileCreated();
      }
    } catch (err) {
      console.error("Profile creation error: ", err);
      alert(
        "Failed to create profile: ",
        +(err.response?.data?.error || err.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Welcome! </h1>
        <h1>Let's set up your profile</h1>
        <p>
          We need some basic information to create personalized meal plans for
          you.
        </p>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Step {step} of 1 - Basic information
        </div>
      </div>
      <form
        onSubmit={createProfile}
        style={{
          backgroundColor: "fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="height"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Height (cm):
          </label>
          <input
            type="number"
            id="height"
            name="height"
            required
            min="100"
            max="250"
            placeholder="e.g., 175"
            onChange={handleInputChange}
            value={formData.height}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="weight"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            required
            min="30"
            max="300"
            placeholder="e.g., 70"
            value={formData.weight}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="date_of_birth"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Date of Birth:
          </label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            required
            max={new Date().toISOString().split("T")[0]}
            onChange={handleInputChange}
            value={formData.date_of_birth}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="activity_level"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Activity Level:
          </label>
          <select
            id="activity_level"
            name="activity_level"
            required
            onChange={handleInputChange}
            value={formData.activity_level}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <option value="">-- Select your activity level --</option>
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
        <div style={{ marginBottom: "30px" }}>
          <label
            htmlFor="goal"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Your Goal:
          </label>
          <select
            id="goal"
            name="goal"
            required
            onChange={handleInputChange}
            value={formData.goal}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <option value="">-- Select your goal --</option>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: isSubmitting ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isSubmitting ? "Creating Profile..." : "Complete Setup"}
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
