import React, { Component } from "react";
import { io } from "socket.io-client";
import { connect } from "react-redux";
import "./Room.css";
import RoomBox from "../../components/RoomBox/RoomBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import InputBox from "../../components/InputBox/InputBox";
import RoomDetail from "../../components/RoomDetail/RoomDetail";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/action/rootAction";

class Room extends Component {
   state = {
      inputText: "",
      addMemberText: "",
      showed: false,
      roomId: "",
   };

   componentDidMount() {
      // Set room Id
      const roomId = this.props.match.params.roomId;
      this.setState({ roomId: roomId });

      // Load room
      this.props.onLoadRoom();

      // Load Message
      this.props.onLoadMessages(roomId);

      // For Socket IO client
      const socket = io("https://me3t.herokuapp.com/");
      socket.on("createMsg", (data) => {
         console.log(data);
         this.props.onAddMessage(data);
      });

      // Scroll To Bottom when ComponentDidMound
      this.scrollToBottom();
   }

   componentDidUpdate(preProps, preState, snapShot) {
      // Input မှာ စာရိုက်တိုင်း render အလုပ်မလုပ်စေချင်လို့
      if (
         preState.inputText !== this.state.inputText ||
         preState.addMemberText !== this.state.addMemberText
      ) {
         return false;
      }

      // Change room Id when room change
      const newRoomId = this.props.match.params.roomId;
      if (newRoomId !== this.state.roomId) {
         this.setState({ roomId: newRoomId });
         // Load Message
         this.props.onLoadMessages(newRoomId);
      }

      // Scroll To Bottom when ComponentDidUpdate
      this.scrollToBottom();
   }

   // Scroll to Bottom(->messageEnd)
   scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
   };

   // For Msg Text Input
   inputChangeHandler = (event, label) => {
      const value = event.target.value;
      this.setState({ [label]: value });
   };

   selectHandler = (emoji) => {
      const inputValue = this.state.inputText + emoji;
      this.setState({ inputText: inputValue });
   };

   // Sent message when press enter
   keyPressHandler = (event) => {
      const keyCode = event.charCode;
      if (keyCode === 13) {
         this.sentMessageHandler();
      }
   };

   sentMessageHandler = () => {
      const data = {
         roomId: this.state.roomId,
         sender: this.props.username,
         message: this.state.inputText,
      };
      this.props.onSentMessage(data);
      this.setState({ inputText: "" });
   };

   // Show Add User Dropdown
   showAddMemberHandler = () => {
      this.setState({ showed: !this.state.showed });
   };

   // Add User
   addMemberHandler = () => {
      const members = this.state.addMemberText.split(" ");
      const data = { members, roomId: this.state.roomId };
      this.props.onAddMember(data);
      this.setState({ addMemberText: "", showed: false });
   };

   render() {
      // Model fof Add Member
      const modal = (
         <Modal showed={this.state.showed} clicked={this.showAddMemberHandler}>
            <div className="Room__AddMember">
               <h2 className="text-2xl font-bold">Add member</h2>
               <input
                  type="email"
                  value={this.state.addMemberText}
                  placeholder="Add member (user1@example.com)"
                  onChange={(e) => this.inputChangeHandler(e, "addMemberText")}
                  className="w-80 py-1 mt-3 mb-1 text-base outline-none"
               />{" "}
               <br />
               <small className="text-sm text-gray-600">
                  Add multiple mumbers by using space-bar.
               </small>
               <div className="mt-1 flex justify-end">
                  <button type="submit" onClick={this.addMemberHandler}>
                     Add
                  </button>
               </div>
            </div>
         </Modal>
      );

      // Loop the room array and return roombox -> Left Side
      let roomAvatarUrl;
      let roomMembers = [];
      let ownerId = "";
      const roomBoxs = this.props.rooms.map((room) => {
         if (room._id === this.props.match.params.roomId) {
            roomAvatarUrl = room.roomAvatarUrl;
            roomMembers = room.members;
            ownerId = room.ownerId;
         }
         return (
            <RoomBox
               key={room._id}
               _id={room._id}
               roomAvatarUrl={room.roomAvatarUrl}
               roomName={room.roomName}
               numOfMembers={room.members.length}
               clicked={this.goToChatRoom}
            />
         );
      });

      // Loop the message array and return messagebox -> Middle Side
      let messageBoxs;
      const roomId = this.props.history.location.pathname.split("/")[2];
      if (roomId && this.props.messages[roomId]) {
         messageBoxs = this.props.messages[roomId].map((message) => {
            if (message.sender === this.props.username) {
               return (
                  <MessageBox
                     key={message._id}
                     message={message}
                     position="justify-end"
                  />
               );
            }
            return <MessageBox key={message._id} message={message} />;
         });
      }

      // Return the Room Detail --> Right Side
      const roomDetail = (
         <RoomDetail
            _id={this.state.roomId}
            ownerId={ownerId}
            roomAvatarUrl={roomAvatarUrl}
            roomName={this.props.roomName}
            roomMembers={roomMembers}
         />
      );

      const room = (
         <div className="Room w-full mx-auto bg-white flex flex-col">
            {/* Room Component's Nav */}
            <div className="Room__Nav w-full h-14 flex">
               <div className="w-3/12 h-full flex items-center">
                  <p>Rooms</p>
               </div>
               <div className="w-9/12 h-full flex justify-between items-center">
                  <p>{this.props.roomName}</p>
                  <abbr
                     title="Add member"
                     className="flex justify-center items-center"
                     onClick={this.showAddMemberHandler}
                  >
                     +
                  </abbr>
               </div>
            </div>

            {/* Room Component's Body */}
            <div className="Room__Body flex">
               {/* Room Body Left */}
               <div className="Room__Body__Left w-3/12">{roomBoxs}</div>
               {/* Room Body Right */}
               <div className="Room__Body__Right w-6/12 flex flex-col">
                  {/* Message */}
                  <div className="Room__Body__Right__MessageBox">
                     {messageBoxs}
                     {/* Scroll to bottom */}
                     <div
                        ref={(el) => {
                           this.messagesEnd = el;
                        }}
                     ></div>
                  </div>
                  {/* Input Box */}
                  <div className="Room__Body__Right__InputBox">
                     <InputBox
                        value={this.state.inputText}
                        changed={this.inputChangeHandler}
                        selected={this.selectHandler}
                        clicked={this.sentMessageHandler}
                        keyPressed={this.keyPressHandler}
                     />
                  </div>
               </div>
               {/* Room Body Right */}
               <div className="Room__Body__Left w-3/12">{roomDetail}</div>
            </div>
         </div>
      );
      return (
         <React.Fragment>
            {modal}
            {room}
         </React.Fragment>
      );
   }
}

const stateToProps = (state) => {
   return {
      username: state.auth.name,
      rooms: state.room.rooms,
      roomName: state.message.roomName,
      messages: state.message.messages,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onLoadRoom: () => dispatch(actions.onLoadRoom()),
      onLoadMessages: (roomId) => dispatch(actions.onLoadMessages(roomId)),
      onSentMessage: (data) => dispatch(actions.onSentMessage(data)),
      onAddMessage: (data) => dispatch(actions.onAddMessage(data)),
      onAddMember: (data) => dispatch(actions.onAddmember(data)),
   };
};

export default connect(stateToProps, dispatchToProps)(Room);
