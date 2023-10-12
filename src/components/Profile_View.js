import React, { useState, useEffect } from "react";
import star from "./images/Star_icon.png";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import imageCompressor from "image-compressor.js";

function Profile_View() {
  const { userData, setUserData, editUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pic, setPic] = useState();
  const [editedUser, setEditedUser] = useState(userData);
  const [nameFromDatabase, setNameFromDatabase] = useState(""); // State to store the fetched name
  const [phoneNoFromDatabase, setPhoneNoFromDatabase] = useState(""); // State to store the fetched phone number
  const [picFromDatabase, setPicFromDatabase] = useState(""); // State to store the fetched profile pic
  // calculating rating variable
  const [no_rating, setNo_Rating] = useState("");
  const [tot_rating, setTot_Rating] = useState("");
  const rating = tot_rating / no_rating;
  const roundedRating = rating.toFixed(2);
  // const roundedRating = 3.22;

  // useState variable to toggle between View and Edit state
  const [isEditing, setIsEditing] = useState(false);
  // console.log(userData);

  useEffect(() => {
    // Make an HTTP request to fetch the user's details
    const fetchUserData = async () => {
      try {
        // Send a POST request to your backend endpoint with the user's email
        const token = localStorage.getItem("token");
        /* Get your JWT token here */

        // Set the headers to include the JWT token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Send a GET request to your backend endpoint with the user's email and the JWT token in headers
        const response = await axios.get(
          `http://127.0.0.1:5000/auth/fetch-user/${userData.email}`,
          { headers } // Include the headers in the request
        );
        // Assuming your API response includes 'name' and 'phoneNo'
        const { name, phoneNo, profilePicture, tot_no_rating, tot_rating } =
          response.data;
        setNameFromDatabase(name);
        setPhoneNoFromDatabase(phoneNo);
        setPicFromDatabase(profilePicture);
        setNo_Rating(tot_no_rating);
        setTot_Rating(tot_rating);
        setEditedUser({
          ...editedUser,
          name, // Update the name
          phoneNo, // Update the phone number
        });
      } catch (error) {
        toast("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function to fetch the user's data
  }, [userData]);

  // useState variable to keep Edited data that will replace existing data
  // function to continuously edit isEditing variable with each user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Check if the input field is 'phoneNo' and the input is not numeric
    if (name === "phoneNo" && !/^\d*$/.test(value)) {
      // If the input is not numeric, do not update the state
      return;
    }

    // Check if the input is longer than 10 digits, and truncate it if necessary
    if (name === "phoneNo" && value.length > 10) {
      const truncatedValue = value.slice(0, 10);
      setEditedUser({
        ...editedUser,
        [name]: truncatedValue,
      });
    } else {
      // Update the state with the input value
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  // function to go into Edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const updatedUserData = {
        name: editedUser.name,
        phoneNo: editedUser.phoneNo,
        profilePicture: selectedImage,
      };
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (selectedImage) {
        await postDetails(selectedImage);
      }

      // Make a PUT request to update the user's details in the database
      await axios.put(
        `http://127.0.0.1:5000/auth/update-profile`,
        updatedUserData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token in the Authorization header
          },
        }
      );

      // Update the user's data in your component state
      setUserData({
        ...userData,
        name: editedUser.name,
        phoneNo: editedUser.phoneNo,
      });

      toast.success("Edited successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postDetails = async (pics) => {
    // setPicLoading(true);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      let compressedBlob = pics;
      const compressor = new imageCompressor();

      try {
        // Compress the image
        compressedBlob = await compressor.compress(pics, { quality: 0.5 });
      } catch (error) {
        console.error("Image compression error:", error);
        // setPicLoading(false);
        return;
      }

      const data = new FormData();
      data.append("file", compressedBlob);
      data.append("upload_preset", "chatapp");
      data.append("cloud_name", "dlkpb4vzg");

      await fetch("https://api.cloudinary.com/v1_1/dlkpb4vzg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the pic state here
          setPic(data.url.toString());
          // setPicLoading(false);
        })
        .catch((err) => {
          toast.error("Error occurred while uploading");
          console.error("Image upload error:", err);
          // setPicLoading(false);
        });
    } else {
      toast.error("Please select a valid image of .jpg or .png type");
      // setPicLoading(false);
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
        <img src={picFromDatabase} className="w-[80px] rounded-full" />
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
              maxLength="10" // Limit input to 10 characters
              className="border-2 rounded-md p-2 w-full text-[#666666]"
            />
          </label>

          <label className="w-full mb-4">
            <strong className="text-[#444444]">Profile Picture:</strong>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(file);
              }}
              className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
            />
          </label>

          <div className="text-center">
            <button
              type="submit"
              onClick={handleSaveClick}
              className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
    w-[116px] bg-blue-500 hover:bg-blue-600 font-medium text-white
    transition-all duration-300 ease-out mr-4"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="py-[10px] px-[16px] rounded-[8px] border border-red-700
    w-[116px] bg-red-500 hover:bg-red-600 font-medium text-white
    transition-all duration-300 ease-out"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <ul>
            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Name:</strong>{" "}
              <p>{nameFromDatabase}</p>
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
              <p>{phoneNoFromDatabase}</p>
            </li>
            <li className="mb-7 flex items-center">
              <strong className="mr-2">
                <img src={star} alt="" className="w-6" />
              </strong>
              <span
                className="mt-1 text-[#444444]"
                style={{ fontWeight: "600" }}
              >
                {roundedRating > 0 ? roundedRating : `No ratings yet`}
              </span>
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
