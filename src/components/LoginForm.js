import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useEffect } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const {setUser,setIsAuthenticated,getUserData} = useContext(AuthContext)
  const {
    setIsAuthenticated,
    setUser,
    setUserData,
    getUserData,
    isAuthenticated,
  } = useContext(AuthContext);
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

  async function submitHandler(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const email = formData.email;
      const password = formData.password;

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        {
          email,
          password,
        },
        config
      );

      if (data.token) {
        // Assuming your server returns a token on successful login
        toast.success("Login successful");
        setIsAuthenticated(true);

        // Store user data in setUserData
        setUserData({
          email: data.email,
          // Include other user data as needed
        });
        setUser(data.email)

        // Save the token in local storage or context for future authenticated requests
        localStorage.setItem("token", data.token);

        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // useEffect(() => {
  //   const userToken = localStorage.getItem('token');
  //   if (userToken) {
  //     // getUserData(user)
  //     // getAllProducts()
  //     setIsAuthenticated(true);
  //     navigate("/dashboard")
  //   }
  //   // eslint-disable-next-line
  // },[])

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
          className="rounded-[0.5rem] w-full p-[12px] border-2 text-[#777777]"
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
          className="rounded-[0.5rem] w-full p-[12px] border-2 text-[#777777]"
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
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
