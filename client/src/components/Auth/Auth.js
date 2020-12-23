import React from "react";
import "./Auth.css";

export const AuthInput = (props) => {
   let errMessage = null;
   if (props.touched && !props.valid) {
      errMessage = (
         <p className="text-sm font-semibold mt-2 w-56 text-red-600 tracking-wide">
            {props.errMsg}
         </p>
      );
   }
   return (
      <div className="AuthInput my-3 flex">
         <div className="AuthInput__Icon w-10 h-10 mr-2 text-lg bg-white flex justify-center items-center border border-gray-300 rounded-full">
            {props.icon}
         </div>
         <div>
            <input
               className="AuthInput__Input text-base bg-white outline-none rounded-2xl"
               {...props.config}
               value={props.value}
               onChange={(e) => props.changed(e, props.label)}
            />
            {errMessage}
         </div>
      </div>
   );
};

export const AuthBtn = (props) => {
   return (
      <button
         className="AuthBtn text-base my-5 text-white border rounded-2xl"
         type="submit"
         disabled={!props.canClick}
         onClick={props.clicked}
      >
         {props.btnname}
      </button>
   );
};
