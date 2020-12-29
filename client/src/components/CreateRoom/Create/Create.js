import React from "react";
import "./Create.css";

const Create = (props) => {
   return (
      <div>
         <h1 className="CreateRoom__Title">Create Room</h1>
         <div className="CreateRoom__InputGroup flex flex-col">
            <label htmlFor="room_name">Room Name</label>
            <input
               type="text"
               placeholder="Room Name"
               id="room_name"
               value={props.value}
               onChange={(e) => props.changed(e, "roomNameToCreate", "text")} // event, label, input type
            />
         </div>
         <div className="CreateRoom__InputGroup flex flex-col">
            <label htmlFor="room_image">Room Image</label>
            <input
               type="file"
               id="room_image"
               onChange={(e) => props.changed(e, "imageValue", "file")} // event, label, input type
            />
            <small className="my-1 text-gray-600">
               Recommended 1:1 image ratio.
            </small>
         </div>
         {/* Previe Image */}
         {props.previewImgValue ? (
            <div className="CreateRoom__PreviewImg">
               <img src={props.previewImgValue} alt="Preview" />
            </div>
         ) : null}
         <div className="CreateRoom__BtnGroup flex justify-end">
            <button onClick={props.cancelRoom}>Cancel</button>
            <button onClick={props.createRoom} type="submit">
               Create
            </button>
         </div>
      </div>
   );
};

export default Create;
