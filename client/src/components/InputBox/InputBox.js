import React, { useState } from "react";
import { Picker } from "emoji-mart";
import "../../../node_modules/emoji-mart/css/emoji-mart.css";
import "./InputBox.css";

const InputBox = (props) => {
   const [showEmoji, setShowEmoji] = useState({ showed: false });
   const emojiBox = (
      <div className="InputBox__EmojiMart">
         <Picker onSelect={(emoji) => props.selected(emoji.native)} />
      </div>
   );

   const toggleEmojiBox = () => {
      const value = !showEmoji.showed;
      setShowEmoji({ showed: value });
   };

   return (
      <div className="InputBox w-full h-full flex items-center">
         {showEmoji.showed ? emojiBox : null}
         <div className="InputBox__Input w-full">
            <input
               type="text"
               value={props.value}
               placeholder="Type a message"
               onChange={(e) => props.changed(e, "inputText")}
               onKeyPress={(e) => props.keyPressed(e)}
            />
            <div className="InputBox__Input__Emoji" onClick={toggleEmojiBox}>
               <i className="far fa-grin"></i>
            </div>
         </div>
         <button
            type="submit"
            onClick={props.clicked}
            className="InputBox__Button text-base font-bold bg-white"
         >
            Send
         </button>
      </div>
   );
};

export default InputBox;
