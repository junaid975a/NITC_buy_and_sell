import React, { useState, useEffect } from "react";
import star from "./images/Star_icon.png";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

function Profile_View() {
  const { userData, setUserData, editUser } = useContext(AuthContext);

  // console.log(userData);
  useEffect(() => {
    console.log(userData);
    // console.log(editUser)
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const [editedUser, setEditedUser] = useState(userData);
  // calculating rating variable
  const rating = userData.tot_rating / userData.tot_no_rating;
  const roundedRating = rating.toFixed(2);
  // useState variable to toggle between View and Edit state
  const [isEditing, setIsEditing] = useState(false);
  // useState variable to keep Edited data that will replace existing data
  // function to continuously edit isEditing variable with each user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
    // console.log(editedUser);
  };

  // function to go into Edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      //Perform any image upload logic here if selectedImage is not null
      if (selectedImage) {
        // Implement image upload logic and update editedUser.profilePicture accordingly
        const imageUrl = await uploadImage(selectedImage);

        // Update the edited user's profilePicture field with the new image URL
        setEditedUser({
          ...editedUser,
          profilePicture: imageUrl,
        });
      }
      setUserData(editedUser);

      // Call the editUser function from the context to update user data
      // if (selectedImage) {
      //   await editUser({
      //     name: editedUser.name,
      //     phoneNo: editedUser.phoneNo,
      //     profilePicture: editedUser.profilePicture,
      //     // Add any other fields you want to update here
      //   });
      // } else {
      await editUser({
        name: editedUser.name,
        phoneNo: editedUser.phoneNo,
        // Add any other fields you want to update here
      });
      // }

      toast.success("Edited successfully");

      // Exit the edit mode
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      // Make an HTTP request to upload the image
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkpb4vzg/image/upload",
        formData
      );

      if (response.status === 200) {
        return response.data.imageUrl; // Replace with the actual key for the image URL in the response
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  // Temporary function to showcase edit working
  // const tempHandleChange = () => {
  // setUserData(editedUser);
  // };

  // renders View or Edit mode depending on state of isEditing variable
  return (
    <div className="w-full sm:w-[380px] md:w-[440px] m-2 p-6 sm:p-12 border rounded-lg shadow-xl bg-white">
      <div className="flex justify-center mb-6 mt-[-16px]">
        <img src={userData.profilePicture} className="w-[80px] rounded-full" />
      </div>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <label className="block mb-4">
            <strong className="text-[#444444]">Name:</strong>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="border-2 rounded-md p-2 w-full text-[#666666]"
            />
          </label>

          <label className="block mb-4">
            <strong className="text-[#444444]">Phone No:</strong>
            <input
              type="text"
              name="phoneNo"
              value={editedUser.phoneNo}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              title="Enter a numeric value of 10 digits" // Custom error message
              className="border-2 rounded-md p-2 w-full text-[#666666]"
            />
          </label>

          <label className="block mb-4">
            <strong className="text-[#444444]">Profile Pic:</strong>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              className="rounded-md text-[#666666] border-2 w-full p-2"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </label>

          <div className="text-center">
            <button
              type="submit"
              onClick={handleSaveClick}
              className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
              w-[116px] bg-blue-500 hover:bg-blue-600 font-medium text-white
              transition-all duration-300 ease-out"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <ul>
            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Name:</strong>{" "}
              <p>{userData?.name}</p>
            </li>
            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Email:</strong>{" "}
              <p>{userData?.email}</p>
            </li>
            {/* <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Roll No:</strong> <p>{userData.roll}</p>
            </li> */}

            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Phone No:</strong>{" "}
              <p>{userData?.phoneNo}</p>
            </li>
            <li className="mb-7 flex items-center">
              <strong className="mr-2">
                <img src={star} alt="" className="w-6" />
              </strong>
              <span className="mt-1 text-[#444444]">{roundedRating}</span>
            </li>
          </ul>
          <div className="text-center">
            <button
              onClick={handleEditClick}
              className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
              w-[116px] bg-blue-500 hover:bg-blue-600 font-medium text-white
              transition-all duration-300 ease-out"
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
