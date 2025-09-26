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
    lose: "Lose Weight",
    maintain: "Maintain Weight",
    gain: "Gain Weight",
  };
  return mapping[value] || value;
};
