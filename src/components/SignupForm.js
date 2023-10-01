import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../css/signupform.css";
import imageCompressor from "image-compressor.js";
import axios from "axios";


const SignupForm = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        confirmPassword: "",
    });
    const [pic, setPic] = useState(); // Store the selected image file
    const [picLoading, setPicLoading] = useState(false);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("")

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [accountType, setAccountType] = useState("student");

    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        setPicLoading(true);
        console.log(formData);
        if ((!formData.firstName && !formData.lastName) || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNo || formData.phoneNo.length !== 10) {
            toast.error("Please enter all required fields correctly");
            setPicLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoggedIn(true);

        try {

            const name = formData.firstName + " " + formData.lastName;
            const email = formData.email;
            const password = formData.password
            const phoneNo = formData.phoneNo

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://127.0.0.1:5000/auth/register",
                {
                    name,
                    email,
                    password,
                    phoneNo,
                    pic,
                },
                config
            );
            console.log(data);
            toast.success("Registration successful")
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            console.log(localStorage.getItem("userInfo"));
            setPicLoading(false);
            const accountData = {
                ...formData,
            };

            const finalData = {
                ...accountData,
                accountType,
            };

            // You can upload the image (pic) here as needed

            console.log(finalData);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Error occurred while registering")
            setPicLoading(false);
        }


    }

    // let imageUrl = "";

    const postDetails = async (pics) => {
        setPicLoading(true);

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }

        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            let compressedBlob;
            const compressor = new imageCompressor();

            try {
                // Compress the image
                compressedBlob = await compressor.compress(pics, { quality: 0.5 });
            } catch (error) {
                console.error("Image compression error:", error);
                setPicLoading(false);
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
                    console.log(data.url.toString());
                    setImageUrl(data.url.toString())
                    setPicLoading(false);
                    console.log(pic);
                    console.log(imageUrl);
                })
                .catch((err) => {
                    console.error("Image upload error:", err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };


    return (
        <div className="mt-6">
            <form
                onLoad={picLoading ? () => { } : undefined}
                onSubmit={submitHandler}
                className="flex flex-col w-full gap-y-4"
                encType="multipart/form-data"
            >
                <div className="flex gap-x-4 w-full x-fields">
                    <label className="w-full">
                        <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">First Name<sup className="text-rose-500">*</sup></p>
                        <input
                            type="text"
                            required
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className="rounded-[0.5rem] border-2 w-full p-[12px] text-[#777777]"
                        />
                    </label>

                    <label className="w-full">
                        <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Last Name<sup className="text-rose-500">*</sup></p>
                        <input
                            type="text"
                            required
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
                        />
                    </label>
                </div>

                <label className="w-full">
                    <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Email Address<sup className="text-rose-500">*</sup></p>
                    <input
                        type="email"
                        required
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address"
                        value={formData.email}
                        className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
                    />
                </label>

                <label className="w-full">
                    <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Phone Number<sup className="text-rose-500">*</sup></p>
                    <input
                        type="phone"
                        required
                        name="phoneNo"
                        onChange={changeHandler}
                        placeholder="Enter Phone Number"
                        value={formData.phoneNo}
                        className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
                    />
                </label>

                <div className="flex gap-x-4 x-fields">
                    <label className="w-full relative">
                        <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Create Password<sup className="text-rose-500">*</sup></p>
                        <input
                            type={showPassword1 ? "text" : "password"}
                            required
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter password"
                            value={formData.password}
                            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
                        />
                        <span
                            onClick={() => setShowPassword1((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {showPassword1 ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#afb2bf" />
                            )}
                        </span>
                    </label>

                    <label className="w-full relative">
                        <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Confirm Password<sup className="text-rose-500">*</sup></p>
                        <input
                            type={showPassword2 ? "text" : "password"}
                            required
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
                        />
                        <span
                            onClick={() => setShowPassword2((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {showPassword2 ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#afb2bf" />
                            )}
                        </span>
                    </label>
                </div>

                <label className="w-full">
                    <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Profile Picture</p>
                    <input
                        type="file"
                        accept="image/*"
                        name="profilePicture"
                        className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                </label>

                <button
                    className="w-full border border-blue-700 bg-blue-500 hover:bg-blue-600 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 transition-all duration-300 ease-out"
                    type="submit"
                    disabled={picLoading}
                >
                    {picLoading ? "Uploading profile picture..." : "Create Account"}
                </button>

            </form>
        </div>
    );
};

export default SignupForm;
