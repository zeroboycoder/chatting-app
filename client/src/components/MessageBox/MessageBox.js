import React from "react";
import "./MessageBox.css";
import senderPf from "../../asset/default.jpg";

const MessageBox = (props) => {
   const messageBoxClasses = ["MessageBox", "m-4", "flex"];
   const senderNameClasses = ["text-base", "font-bold", "mb-2"];
   const timeClasses = ["text-xs", "mt-2"];
   let senderName = props.message.sender;
   let senderProfile = (
      <img
         src={
            props.message.senderAvatar ? props.message.senderAvatar : senderPf
         }
         alt="Sender profile"
         className="w-7 h-7 rounded-full"
      />
   );

   if (props.position === "justify-end") {
      messageBoxClasses.push(props.position);
      senderProfile = null;
      senderName = "Me";
      senderNameClasses.push("text-right");
      timeClasses.push("text-right");
   }

   return (
      <div className={messageBoxClasses.join(" ")}>
         {senderProfile}
         <div className="flex flex-col ml-3">
            <p className={senderNameClasses.join(" ")}>{senderName}</p>
            <div>
               <p className="MessageBox__Message text-base px-3 py-2">
                  {props.message.message}
               </p>
               <p className={timeClasses.join(" ")}>{props.message.time}</p>
            </div>
         </div>
      </div>
   );
};

export default MessageBox;
