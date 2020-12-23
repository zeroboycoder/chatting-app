import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
   return props.showed ? (
      <div
         className="Backdrop w-screen h-screen fixed"
         onClick={props.clicked}
      ></div>
   ) : null;
};

export default Backdrop;
