import React, { useState, useEffect } from "react";
import DashboardItemCollection from "../components/DashboardItemCollection";

const Dashboard = () => {
  const [searchParam, setSearchParam] = useState("");
  const changeHandler = (e) => {
    setSearchParam(e.target.value);
    // console.log(searchParam);
  };
  // useEffect(() => {
  //     console.log(searchParam); // This will log the updated value of searchParam
  // }, [searchParam]);

  return (
    <div className="w-full h-full flex flex-col items-center">
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
                       p-[12px]"
        />
      </div>
      <DashboardItemCollection searchParam={searchParam}/>
    </div>
  );
};

export default Dashboard;
