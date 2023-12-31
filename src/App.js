import "./App.css";
import React, { useContext, useEffect, useState } from "react";
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
import ChatPage from "./pages/ChatPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/auth/AuthContext";
import AuthState from "./context/auth/AuthState";
import ChatState from "./context/chat/ChatState";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userData, setUserData } =
    useContext(AuthContext);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="h-[100vh] w-[100vw]">
      <AuthState>
        <ToastContainer />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
          <Route
            path="/chatpage"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ChatPage />
              </PrivateRoute>
            }
          />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </AuthState>
    </div>
  );
}

export default App;
