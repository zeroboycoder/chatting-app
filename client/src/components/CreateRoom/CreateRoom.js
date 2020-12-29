import React, { useState } from "react";
import "./CreateRoom.css";
import Modal from "../UI/Modal/Modal";
import Join from "./Join/Join";
import Create from "./Create/Create";

const CreateRoom = (props) => {
   const [choice, setChoice] = useState({ value: "join" });

   const choiceHandler = (value) => {
      setChoice({ value: value });
   };

   // Determind join or create
   let returnValue = (
      <Join
         value={props.roomIdValue}
         changed={props.changed}
         joinRoom={props.joinRoom}
         cancelRoom={props.cancelRoom}
      />
   );

   if (choice.value === "create") {
      returnValue = (
         <Create
            value={props.roomNameValue}
            previewImgValue={props.previewImgValue}
            changed={props.changed}
            createRoom={props.createRoom}
            cancelRoom={props.cancelRoom}
         />
      );
   }

   return (
      <Modal showed={props.showed} clicked={props.cancelRoom}>
         <div className="CreateRoom__Choice">
            <button
               className={choice.value === "join" ? "active" : null}
               onClick={() => choiceHandler("join")}
            >
               Join
            </button>
            <button
               className={choice.value === "create" ? "active" : null}
               onClick={() => choiceHandler("create")}
            >
               Create
            </button>
         </div>
         {returnValue}
      </Modal>
   );
};

export default CreateRoom;
