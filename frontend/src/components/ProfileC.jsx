import React from "react";

function ProfileC(profileC) {
  return (
    <div>
      <p>{profileC.height}</p>
      <p>{profileC.weight}</p>
      <p>{profileC.age}</p>
      <p>{profileC.activity_level}</p>
      <p>{profileC.goal}</p>
    </div>
  );
}

export default ProfileC;
