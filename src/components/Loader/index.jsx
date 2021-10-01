import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import "./loader.css"

function Loader({size=""}) {
  return (
    <span className={`icon loader-${size} c-theme`}>
      <BiLoaderCircle />
    </span>
  );
}
export { Loader };
