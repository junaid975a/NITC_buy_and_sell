import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nitc_logo_icon.svg";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      {!isLoggedIn && (
        <Link to="/">
          <img src={logo} alt="logo" width={60} height={32} loading="lazy" />
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/dashboard">
          <img src={logo} alt="logo" width={60} height={32} loading="lazy" />
        </Link>
      )}

      {!isLoggedIn && (
        <nav>
          <ul className="flex gap-x-6">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </nav>
      )}

      {isLoggedIn && (
        <nav>
          <ul className="flex gap-x-6">
            <li>
              <Link to="/dashboard">Bought</Link>
            </li>
            <li>
              <Link to="/dashboard">My List</Link>
            </li>
            <li>
              <Link to="/additem">Add Item</Link>
            </li>
            <li>
              <Link to="/dashboard">Chats</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      )}

      

      {/* login-signup-logout-dashboard */}
      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <Link to="/login">
            <button
              className="text-richblack-100 bg-richblack-800 py-[8px]
                            px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log In
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className="text-richblack-100 bg-richblack-800 py-[8px]
                            px-[12px] rounded-[8px] border border-richblack-700"
            >
              Sign Up
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}
              className="text-richblack-100 bg-richblack-800 py-[8px]
                        px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log Out
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button
              className="text-richblack-100 bg-richblack-800 py-[8px]
                            px-[12px] rounded-[8px] border border-richblack-700"
            >
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
