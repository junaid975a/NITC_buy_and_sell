import React, { useState } from "react";

function Profile_View({ user, setUser }) {
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
    <div className="user-profile p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-4xl font-bold mb-10">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <label className="block mb-2">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <strong>Roll Number:</strong>
            <input
              type="text"
              name="roll"
              value={editedUser.roll}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <strong>Address:</strong>
            <input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            <strong>Phone Number:</strong>
            <input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
            />
          </label>
          <button
            type="submit"
            onClick={tempHandleChange}
            className="bg-yellow-300 hover:bg-yellow-400 rounded-md text-black py-2 px-4 mt-4"
          >
            Save
          </button>
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
          </ul>
          <button
            onClick={handleEditClick}
            className="bg-yellow-300 hover:bg-yellow-400 rounded-md text-black py-2 px-4 mt-4"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile_View;
