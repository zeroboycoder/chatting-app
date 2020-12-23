import React from "react";

const Join = (props) => {
   return (
      <div>
         <h1 className="CreateRoom__Title">Join Room</h1>
         <div className="CreateRoom__InputGroup flex flex-col">
            <label htmlFor="room_name">Room ID</label>
            <input
               type="text"
               placeholder="Room ID"
               id="room_name"
               value={props.value}
               onChange={(e) => props.changed(e, "roomIdToJoin", "text")} // event, label, input type
            />
         </div>
         <div className="CreateRoom__BtnGroup flex justify-end">
            <button onClick={props.cancelRoom}>Cancel</button>
            <button onClick={props.joinRoom}>Join</button>
         </div>
      </div>
   );
};

export default Join;
