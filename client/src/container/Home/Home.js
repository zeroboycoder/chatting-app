import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import RoomBox from "../../components/RoomBox/RoomBox";
import Spinner from "../../components/UI/Spinner/Spinner";
import CreateRoom from "../../components/CreateRoom/CreateRoom";
import CreateRoomBtn from "../../components/UI/CreateRoomBtn/CreateRoomBtn";
import {
   onLoadRoom,
   onJoinRoom,
   onCreateRoom,
} from "../../store/action/rootAction";

class Home extends Component {
   state = {
      showCreateRoom: false,
      // Join
      roomIdToJoin: "",
      // Create
      roomNameToCreate: "",
      imageFile: "",
      previewImgValue: "",
   };

   componentDidMount() {
      this.props.onLoadRoom();
   }

   // Preview Image
   previewImage = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         this.setState({ previewImgValue: reader.result });
      };
   };

   // Change Handlers
   inputChangeHandler = (event, label, type) => {
      // Check the input type is 'file' of 'text'
      if (type === "file") {
         const value = event.target.files[0];
         this.setState({ imageFile: value });
         this.previewImage(value);
      }
      if (type === "text") {
         const value = event.target.value;
         this.setState({ [label]: value });
      }
   };

   resetInputValue = () => {
      this.setState({
         roomIdToJoin: "",
         roomNameToCreate: "",
         previewImgValue: "",
      });
   };

   // Join Room
   joinRoom = () => {
      const data = {
         roomId: this.state.roomIdToJoin,
      };
      this.props.onJoinRoom(data);
      this.toogleCreateRoomHandler();
      this.resetInputValue();
   };

   // Create Room
   createRoom = () => {
      const form = new FormData();
      form.append("roomName", this.state.roomNameToCreate);
      form.append("roomAvatar", this.state.imageFile);
      this.props.onCreateRoom(form);
      this.toogleCreateRoomHandler();
      this.resetInputValue();
   };

   toogleCreateRoomHandler = () => {
      this.setState({
         showCreateRoom: !this.state.showCreateRoom,
         roomNameToCreate: "",
      });
   };

   render() {
      let homeCom = <Spinner />;
      if (!this.props.roomLoading && !this.props.authLoading) {
         const rooms = this.props.rooms.map((room) => {
            return (
               <RoomBox
                  key={room._id}
                  _id={room._id}
                  roomAvatarUrl={room.roomAvatarUrl}
                  roomName={room.roomName}
                  numOfMembers={room.members.length}
               />
            );
         });
         homeCom = (
            <div className="Home w-10/12 mx-auto border border-gray-300">
               <CreateRoom
                  showed={this.state.showCreateRoom}
                  changed={this.inputChangeHandler}
                  // Value
                  roomIdValue={this.state.roomIdToJoin}
                  roomNameValue={this.state.roomNameToCreate}
                  previewImgValue={this.state.previewImgValue}
                  // submit Type
                  joinRoom={this.joinRoom}
                  createRoom={this.createRoom}
                  cancelRoom={this.toogleCreateRoomHandler}
               />
               {rooms}
               <CreateRoomBtn clicked={this.toogleCreateRoomHandler} />
            </div>
         );
      }
      return homeCom;
   }
}

const stateToProps = (state) => {
   return {
      rooms: state.room.rooms,
      roomLoading: state.room.loading,
      authLoading: state.auth.loading,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onLoadRoom: () => dispatch(onLoadRoom()),
      onJoinRoom: (data) => dispatch(onJoinRoom(data)),
      onCreateRoom: (data) => dispatch(onCreateRoom(data)),
   };
};

export default connect(stateToProps, dispatchToProps)(Home);
