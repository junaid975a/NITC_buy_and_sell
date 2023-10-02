import React from "react";
import img from "./images/bgimg.png";
import "./App.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation after a delay (e.g., 1000 milliseconds)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? "active" : ""}`}>
      <div className="w-screen h-screen flex justify-center items-center text-3xl">
        {" "}
        <img src={img} alt="" className="w-full md:w-3/5 h-auto mb-20" />
        {/* Adjust the margin class */}
      </div>
    </div>
  );
};

export default Home;
