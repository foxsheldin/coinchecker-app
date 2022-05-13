import React from "react";
import { Outlet } from "react-router-dom";

import $ from "jquery";

import "./css/coinchecker-style.css";

import NavBarSystem from "./common/NavBarSystem/NavBarSystem";

const SystemLayout = () => {
  return (
    <div>
      <NavBarSystem />
      <Outlet />
    </div>
  );
};

export default SystemLayout;
