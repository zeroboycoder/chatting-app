import React from "react";
import "./RoomDetail.css";
import Model from "../UI/Modal/Modal";
import defaultAvatar from "../../asset/default.jpg";

const RoomDetail = (props) => {
   let members = [];
   let avatar = "";
   if (props.roomMembers) {
      props.roomMembers.map((member) => {
         member.avatar ? (avatar = member.avatar) : (avatar = defaultAvatar);
         return members.push(
            <div key={member._id} className="my-1 flex items-center">
               <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-9 h-9 mr-2 rounded-full"
               />
               <p>{member.name}</p>
               {props.ownerId === member._id ? (
                  <span className="ml-1">(Owner)</span>
               ) : null}
            </div>
         );
      });
   }
   return (
      <section className="w-full">
         <Model showed={props.showed} clicked={props.toggleDeleteRoomHandler}>
            <div className="DeleteRoomModal">
               <p>
                  Are you sure to delete
                  <span className="font-bold"> "{props.roomName}"</span>
               </p>
               <div className="DeleteRoomBtnGroup flex justify-end">
                  <button onClick={props.toggleDeleteRoomHandler}>
                     Cancel
                  </button>
                  <button onClick={props.deleteRoomHandler}>Delete</button>
               </div>
            </div>
         </Model>
         <div className="w-full mt-8 flex flex-col justify-center items-center tracking-wide">
            <img
               src={props.roomAvatarUrl}
               alt="Room Avatar"
               className="RoomDetail__RoomAvatar"
            />
            <p className="mb-1 text-xl flex justify-center">{props.roomName}</p>
            <div className="RoomDetail__Group">Room ID : {props._id}</div>
            <div className="RoomDetail__Group">
               <p>Members</p>
               <div className="w-full mt-1">{members}</div>
            </div>
            {props.currentUserId === props.ownerId ? (
               <div className="RoomDetail__Group">
                  <button
                     className="px-6 py-1.5 font-bold text-red-600 cursor-pointer"
                     onClick={props.toggleDeleteRoomHandler}
                  >
                     Delete Room
                  </button>
               </div>
            ) : null}
         </div>
      </section>
   );
};

export default RoomDetail;
