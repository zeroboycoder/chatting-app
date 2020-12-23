import React from "react";
import "./Flash.css";

const Flash = (props) => {
   const classes = ["Flash", "flex", "justify-center", "items-center"];
   classes.push(props.type);
   return <div className={classes.join(" ")}>{props.children}</div>;
};

export default Flash;
