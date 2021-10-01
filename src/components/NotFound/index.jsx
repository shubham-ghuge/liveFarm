import React from "react";
import { BiErrorAlt } from "react-icons/bi";
export const NotFound = () => {
  return (
    <div style={{ margin: "100px 0 0" }} className="d-block text-center">
      <BiErrorAlt className="fsz-5 text-danger" />
      <h2 style={{ color: "#ccc" }}>Page Not Found</h2>
    </div>
  );
};
