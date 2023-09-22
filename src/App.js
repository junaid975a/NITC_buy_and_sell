import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import MyList from "./pages/MyList";
import Bought from "./pages/Bought";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        className=""
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        {/* <Route path="mylist" element={<MyList/>}/>
        <Route path="/bought" element={<Bought/>}/> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/mylist"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/bought"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Bought />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
