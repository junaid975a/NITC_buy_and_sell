import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nitc_logo_icon.svg";
import { toast } from "react-hot-toast";
import AddandEditPopup from "./AddandEditPopup";
import "../css/navbar.css";
import { useContext } from "react";
import AuthContext from "../context/auth/authContext";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext)
  const categories = [
    { category_id: 1, category_name: "electronics" },
    { category_id: 2, category_name: "furniture" },
    { category_id: 3, category_name: "others" },
  ];

  // State to control the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to open the popup

  // State to control the visibility of the menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Function to hide the menu
  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const openPopup = () => {
    setIsMenuVisible(false);
    setIsPopupVisible(true);
  };

  return (
    <nav className="flex justify-between items-center h-fit pt-4 relative px-4">
      {/* image */}
      <div className="flex items-center align-baseline pl-6">
        <Link to={isLoggedIn ? "/dashboard" : "/"}>
          <img src={logo} alt="logo" width={60} height={32} loading="lazy" />
        </Link>
      </div>
      {/* hamburger */}
      <div className="hamburger">
        <input
          id="menu-toggle"
          type="checkbox"
          checked={isMenuVisible}
          onChange={toggleMenu}
        />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>

        <div className="menu">
          {!isLoggedIn && (
            <nav>
              <ul className="link-list">
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/">Home</Link>
                </li>
                <li className="group relative mt" onClick={hideMenu}>
                  <Link to="/about">About</Link>
                </li>
                <li className="group relative mt" onClick={hideMenu}>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          )}
          {isLoggedIn && (
            <nav>
              <ul className="link-list">
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/bought">Bought</Link>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/mylist">My List</Link>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <button onClick={openPopup} className="cursor-pointer">
                    Add Item
                  </button>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/chatpage">Chats</Link>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </nav>
          )}
          {/* login-signup-logout-dashboard */}
          <nav>
            <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-4">
              {!isAuthenticated && (
                <Link to="/login">
                  <button
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                    onClick={hideMenu}
                  >
                    Log In
                  </button>
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/signup">
                  <button
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                    onClick={hideMenu}
                  >
                    Sign Up
                  </button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/">
                  <button
                    onClick={() => {
                      hideMenu();
                      setIsLoggedIn(false);
                      toast.success("Logged Out");
                    }}
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                  >
                    Log Out
                  </button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/dashboard">
                  <button
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                    onClick={hideMenu}
                  >
                    Dashboard
                  </button>
                </Link>
              )}

              {/* Render the popup component with visibility controlled by the state */}
              {isPopupVisible && (
                <AddandEditPopup
                  onClose={() => setIsPopupVisible(false)} // Pass a function to close the popup
                  categories={categories}
                />
              )}
            </div>
          </nav>
        </div>
      </div>
    </nav>
    // <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
    //   {!isLoggedIn && (
    //     <Link to="/">
    //       <img src={logo} alt="logo" width={60} height={32} loading="lazy" />
    //     </Link>
    //   )}
    //   {isLoggedIn && (
    //     <Link to="/dashboard">
    //       <img src={logo} alt="logo" width={60} height={32} loading="lazy" />
    //     </Link>
    //   )}

    //   {!isLoggedIn && (
    //     <nav>
    //       <ul className="flex gap-x-6">
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/">About</Link>
    //         </li>
    //         <li>
    //           <Link to="/">Contact</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   )}

    //   {isLoggedIn && (
    //     <nav>
    //       <ul className="flex gap-x-6">
    //         <li>
    //           <Link to="/bought">Bought</Link>
    //         </li>
    //         <li>
    //           <Link to="/mylist">My List</Link>
    //         </li>
    //         <li>
    //           <button onClick={openPopup} className="cursor-pointer">
    //             Add Item
    //           </button>
    //         </li>
    //         <li>
    //           <Link to="/chatpage">Chats</Link>
    //         </li>
    //         <li>
    //           <Link to="/profile">Profile</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //   )}

    //   {/* login-signup-logout-dashboard */}
    //   <div className="flex items-center gap-x-4">
    //     {!isLoggedIn && (
    //       <Link to="/login">
    //         <button
    //           className="text-richblack-100 bg-richblack-800 py-[8px]
    //                         px-[12px] rounded-[8px] border border-richblack-700"
    //         >
    //           Log In
    //         </button>
    //       </Link>
    //     )}
    //     {!isLoggedIn && (
    //       <Link to="/signup">
    //         <button
    //           className="text-richblack-100 bg-richblack-800 py-[8px]
    //                         px-[12px] rounded-[8px] border border-richblack-700"
    //         >
    //           Sign Up
    //         </button>
    //       </Link>
    //     )}
    //     {isLoggedIn && (
    //       <Link to="/">
    //         <button
    //           onClick={() => {
    //             setIsLoggedIn(false);
    //             toast.success("Logged Out");
    //           }}
    //           className="text-richblack-100 bg-richblack-800 py-[8px]
    //                     px-[12px] rounded-[8px] border border-richblack-700"
    //         >
    //           Log Out
    //         </button>
    //       </Link>
    //     )}
    //     {isLoggedIn && (
    //       <Link to="/dashboard">
    //         <button
    //           className="text-richblack-100 bg-richblack-800 py-[8px]
    //                         px-[12px] rounded-[8px] border border-richblack-700"
    //         >
    //           Dashboard
    //         </button>
    //       </Link>
    //     )}

    //     {/* Render the popup component with visibility controlled by the state */}
    //     {isPopupVisible && (
    //       <AddandEditPopup
    //         onClose={() => setIsPopupVisible(false)} // Pass a function to close the popup
    //         categories={categories}
    //       />
    //     )}

    //   </div>
    // </div>
  );
};

export default Navbar;
