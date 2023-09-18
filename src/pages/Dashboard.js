import React from "react";
import DashboardItemCollection from "../components/DashboardItemCollection";

const Dashboard = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center text-xl">
            {/* here import and use DashboardItemCollection component */}
            <DashboardItemCollection />
        </div>
    )
}

export default Dashboard;