import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false); 

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    setLoading(true);
    if (!formData.email || !formData.password) {
      toast.error("Please enter all required fields correctly");
      return;
    }

    try {
      const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token":localStorage.getItem("userInfo").token
        },
    };
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while registering")
    }


    toast.success("Success");
    navigate("/dashboard");

    console.log(formData);
  }
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem] text-[#333333]">
          Email Address<sup className="text-rose-500">*</sup>
        </p>

        <input
          type="email"
          required
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Address"
          name="email"
          className="rounded-[0.5rem]
                        w-full p-[12px] border-2 text-[#777777]"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem] text-[#333333]">
          Password<sup className="text-rose-500">*</sup>
        </p>

        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="rounded-[0.5rem]
                        w-full p-[12px] border-2 text-[#777777]"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#afb2bf" />
          )}
        </span>
      </label>
      <Link to="#">
        <p className="text-xs mt-1 text-slate-400 hover:text-slate-600 max-w-max ml-auto">
          Forgot Password
        </p>
      </Link>

      <button
        className="w-full border border-blue-700 bg-blue-500 hover:bg-blue-600 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 transition-all duration-300 ease-out"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
