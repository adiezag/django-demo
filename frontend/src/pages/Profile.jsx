import ProfileC from "../components/ProfileC";
import { useState, useEffect } from "react";
import api from "../api";
function Profile() {
  const [profile, setProfile] = useState([]);
  // const [height, setHeight] = useState("");
  // const [weight, setWeight] = useState("");
  // const [age, setAge] = useState("");
  // const [activity_level, setActivity_level] = useState("");
  // const [goal, setGoal] = useState("");
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = () => {
    api
      .get("/api/profile/")
      .then((res) => res.data)
      .then((data) => {
        setProfile(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>User's profile</h2>
        {profile.map((profile) => (
          <ProfileC profile={profile} key={profile} />
        ))}
      </div>
    </div>
  );
}
export default Profile;
