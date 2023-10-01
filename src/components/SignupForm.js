import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../css/signupform.css"

const SignupForm = ({ setIsLoggedIn }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [accountType, setAccountType] = useState("student")

    function changeHandler(event) {
        setFormData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoggedIn(true);
        toast.success("Account Created");

        const accountData = {
            ...formData
        }

        const finalData = {
            ...accountData,
            accountType
        }

        console.log(finalData);
        navigate("/dashboard");
    }
    return (
        <div className="mt-6">

            <form onSubmit={submitHandler}
                className="flex flex-col w-full gap-y-4">
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
                            className=" rounded-[0.5rem] border-2
                        w-full p-[12px] text-[#777777]"
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
                            className="rounded-[0.5rem] text-[#777777] border-2
                        w-full p-[12px]"
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
                        className="rounded-[0.5rem] text-[#777777] border-2
                        w-full p-[12px]"
                    />
                </label>

                <div className="flex gap-x-4 x-fields">
                    <label className="w-full relative">
                        <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Create Password<sup className="text-rose-500">*</sup></p>
                        <input
                            type={showPassword1 ? ("text") : ("password")}
                            required
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter password"
                            value={formData.password}
                            className="rounded-[0.5rem] text-[#777777] border-2
                            w-full p-[12px]"
                        />
                        <span onClick={() => setShowPassword1((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer">
                            {
                                showPassword1 ? (<AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />) : (<AiOutlineEye fontSize={24} fill="#afb2bf" />)
                            }
                        </span>
                    </label>

                    <label className="w-full relative">
                        <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">Confirm Password<sup className="text-rose-500">*</sup></p>
                        <input
                            type={showPassword2 ? ("text") : ("password")}
                            required
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            className="rounded-[0.5rem] text-[#777777] border-2
                            w-full p-[12px]"
                        />
                        <span onClick={() => setShowPassword2((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer">
                            {
                                showPassword2 ? (<AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />) : (<AiOutlineEye fontSize={24} fill="#afb2bf" />)
                            }
                        </span>
                    </label>
                </div>

                <button className="w-full border border-blue-700 bg-blue-500 hover:bg-blue-600 rounded-[8px] font-medium text-white
                px-[12px] py-[8px] mt-6
                transition-all duration-300 ease-out">
                    Create Account
                </button>
            </form>

        </div>
    )
}

export default SignupForm;