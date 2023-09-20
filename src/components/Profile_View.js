import React, { useState } from "react";
import star from "./images/Star_icon.png";

function Profile_View({ user, setUser }) {
  // calculating rating variable
  const rating = user.tot_rating / user.no_of_rating;
  const roundedRating = rating.toFixed(2);
  // useState variable to toggle between View and Edit state
  const [isEditing, setIsEditing] = useState(false);
  // useState variable to keep Edited data that will replace existing data
  const [editedUser, setEditedUser] = useState(user);

  // function to continuously edit isEditing variable with each user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  // function to go into Edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Here, you can implement the logic to save the edited user data
    // You may send a request to your server to update the user's details
    // Once saved, you can also update the 'user' state with the edited data if needed

    // For this example, let's just exit the edit mode

    setIsEditing(false);
  };

  // Temporary function to showcase edit working
  const tempHandleChange = () => {
    setUser(editedUser);
  };

  // renders View or Edit mode depending on state of isEditing variable
  return (
    <div className="user-profile p-16 border rounded-lg shadow-2xl bg-white font-sans">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-12">
          {isEditing ? "Edit Profile" : "User Profile"}
        </h2>
      </div>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <label className="block mb-4">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>

          <label className="block mb-4">
            <strong>Roll Number:</strong>
            <input
              type="text"
              name="roll"
              value={editedUser.roll}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <label className="block mb-4">
            <strong>Address:</strong>
            <input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <label className="block mb-4">
            <strong>Phone Number:</strong>
            <input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              title="Enter a numeric value of 10 digits" // Custom error message
              className="border rounded-md p-2 w-full"
            />
          </label>
          <div className="text-center">
            <button
              type="submit"
              onClick={tempHandleChange}
              className="bg-yellow-300 hover:bg-yellow-400 rounded-md text-black py-3 px-10 mt-6 font-semibold w-full"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <ul>
            <li className="mb-7">
              <strong>Name:</strong> {user.name}
            </li>
            <li className="mb-7">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="mb-7">
              <strong>Roll Number:</strong> {user.roll}
            </li>
            <li className="mb-7">
              <strong>Address:</strong> {user.address}
            </li>
            <li className="mb-7">
              <strong>Phone Number:</strong> {user.phone}
            </li>
            <li className="mb-7 flex items-center">
              <strong className="mr-2">
                <img src={star} alt="" className="w-10 h-10" />
              </strong>
              <span className="mt-1">{roundedRating}</span>
            </li>
          </ul>
          <div className="text-center">
            <button
              onClick={handleEditClick}
              className="bg-yellow-300 hover:bg-yellow-400 rounded-md text-black py-3 px-6 mt-4 font-semibold w-full"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile_View;
