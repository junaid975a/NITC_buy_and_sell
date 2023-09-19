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
    <div className="w-screen h-screen flex flex-col justify-center items-center text-xl">
      {/* here import and use DashboardItemCollection component */}
      <div>
        <input
          type="text"
          required
          value={searchParam}
          onChange={changeHandler}
          placeholder="Search Here..."
          name="search"
          className="rounded-[0.5rem]
                        w-full p-[12px]"
        />
      </div>
      <DashboardItemCollection searchParam={searchParam} />
    </div>
  );
};

export default Dashboard;
