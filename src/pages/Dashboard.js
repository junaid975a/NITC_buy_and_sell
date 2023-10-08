import React, { useState, useEffect } from "react";
import DashboardItemCollection from "../components/DashboardItemCollection";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import ProductContext from "../context/product/ProductContext";
import ChatContext from "../context/chat/ChatContext";



const Dashboard = () => {
  const { user, isAuthenticated, getUserData, userData } = useContext(AuthContext)
  const { getAllProducts, getCategories } = useContext(ProductContext)
  const { getAllChats } = useContext(ChatContext);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setSearchParam(e.target.value);
    // console.log(searchParam);
  };
  useEffect(() => {
    const getUserDataFunction = async() => {
      await getUserData(user)
      await getAllProducts()
      await getCategories()
    }
    if (isAuthenticated) {
      if (!userData) {
        console.log("getting data");
      }
      getUserDataFunction();
      console.log(user)
    } else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="w-full h-full flex flex-col items-center mt-6">
      {/* here import and use DashboardItemCollection component */}
      <div className="w-full flex flex-col items-center mb-[28px]">
        <input
          type="text"
          required
          value={searchParam}
          onChange={changeHandler}
          placeholder="Search Here..."
          name="search"
          className="rounded-[0.5rem]
                       p-[12px] border-2 text-[#777777] w-2/3 max-w-lg"
        />
      </div>
      <DashboardItemCollection searchParam={searchParam} />
    </div>
  );
};

export default Dashboard;
