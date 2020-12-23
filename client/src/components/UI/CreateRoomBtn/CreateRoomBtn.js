import React from "react";
import "./CreateRoomBtn.css";

const CreateRoomBtn = (props) => {
   return (
      <div
         className="CreateRoomBtn w-12 h-12 cursor-pointer bg-white rounded-full flex justify-center items-center"
         onClick={props.clicked}
      >
         <abbr title="New Room">+</abbr>
      </div>
   );
};

export default CreateRoomBtn;
