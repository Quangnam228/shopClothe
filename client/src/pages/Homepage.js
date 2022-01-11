import React from "react";
import { Outlet } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Homepage;
