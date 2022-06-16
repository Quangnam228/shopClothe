import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
const DashBoard = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <Sidebar />
        </div>

        <Outlet />
      </div>
    </>
  );
};
export default DashBoard;
