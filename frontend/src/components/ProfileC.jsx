import React from "react";

function ProfileC({ profile }) {
  console.log("test");
  return (
    <div>
      <p>Height: {profile.height}</p>
      <p>Weight: {profile.weight}</p>
      <p>Age: {profile.age}</p>
      <p>Activity level: {profile.activity_level}</p>
      <p>Goal: {profile.goal}</p>
    </div>
  );
}

export default ProfileC;
