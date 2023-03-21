import React from "react";
import NavBar from "../NavBar";

const SharedLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
      className="p-6"
    >
      <NavBar />
      <div>{children}</div>
      <div className="text-center p-4">
        Copyright 2023 - Group 01 - COMP 231
      </div>
    </div>
  );
};

export default SharedLayout;
