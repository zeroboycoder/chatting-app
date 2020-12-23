import React from "react";
import "./RoomDetail.css";
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
                  className="w-10 h-10 mr-2 rounded-full"
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
         <div className="w-full mt-8 flex flex-col justify-center items-center tracking-wide">
            <img
               src={props.roomAvatarUrl}
               alt="Room Avatar"
               className="RoomDetail__RoomAvatar"
            />
            <p className="mb-1 text-xl flex justify-center">{props.roomName}</p>
            <div className="RoomDetail__Group">Room ID : {props._id} </div>
            <div className="RoomDetail__Group">
               <p>Members</p>
               <div className="w-full">{members}</div>
            </div>
         </div>
      </section>
   );
};

export default RoomDetail;
