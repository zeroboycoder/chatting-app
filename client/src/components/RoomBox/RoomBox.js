import React from "react";
import { withRouter } from "react-router-dom";
import "./RoomBox.css";

const RoomBox = (props) => {
   const classes = [];
   if (props.match.params.roomId === props._id) {
      classes.push("active");
   }

   const goToChatRoom = (roomId) => {
      props.history.push("/rooms/" + roomId);
   };

   return (
      <div
         className={`RoomBox w-full px-6 bg-white cursor-pointer flex items-center ${classes.join()}`}
         onClick={() => goToChatRoom(props._id)}
      >
         <div className="RoomBox__Img mr-4">
            <img
               src={props.roomAvatarUrl}
               alt="Room Avatar"
               className="w-12 h-12 rounded-full"
            />
         </div>
         <div className="tracking-wide">
            <p className="text-lg font-bold">{props.roomName}</p>
            <p className="text-gray-800 text-sm">
               Members : {props.numOfMembers}
            </p>
         </div>
      </div>
   );
};

export default withRouter(RoomBox);
