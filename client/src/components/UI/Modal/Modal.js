import React from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
   const classes = ["Modal"];
   if (props.showed) {
      classes.push("showModal");
   }
   if (!props.showed) {
      classes.push("hideModal");
   }

   return (
      <div>
         <Backdrop showed={props.showed} clicked={props.clicked} />
         <div className={classes.join(" ")}>{props.children}</div>
      </div>
   );
};

export default Modal;
