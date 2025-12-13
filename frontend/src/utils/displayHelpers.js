import { Navigate } from "react-router-dom";

export const getActivityLevelDisplay = (value) => {
  const mapping = {
    sedentary: "Sedentary",
    light: "Light",
    moderate: "Moderate",
    active: "Active",
  };
  return mapping[value] || value;
};

export const getGoalDisplay = (value) => {
  const mapping = {
    lose: "Lose weight",
    maintain: "Maintain weight",
    gain: "Gain weight",
  };
  return mapping[value] || value;
};

export const Logout = () => {
  localStorage.clear();
  window.location.href = "/login"; // plain JS redirect
};
