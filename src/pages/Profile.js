import React from "react";
import Profile_View from "../components/Profile_View";

const Profile = (formData) => {
  // Setting temporary values for user data
  // Will take formData object values during actual implementation
  const [user, setUser] = React.useState({
    name: "Joel",
    email: "joel@nitc.ac.in",
    roll: "M210694CA",
    address: "Calicut",
    phone: "1234567890",
    tot_rating: 30,
    no_of_rating: 7,
  });
  return (
    <div className="w-[100vw] h-[85vh] flex justify-center items-center">  
      <Profile_View user={user} setUser={setUser} />
    </div>
  );
};

export default Profile;
