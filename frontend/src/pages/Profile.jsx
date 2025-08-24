import ProfileC from "../components/ProfileC";
import { useState, useEffect } from "react";
import api from "../api";
function Profile() {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = () => {
    api
      .get("/api/profile/")
      .then((res) => res.data)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>User's profile</h2>
        {profile.map((profile_) => (
          <ProfileC profile_={profile_} key={profile_} />
        ))}
      </div>
    </div>
  );
}
export default Profile;
