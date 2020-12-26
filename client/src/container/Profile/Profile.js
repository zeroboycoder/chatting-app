import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";
import Modal from "../../components/UI/Modal/Modal";
import defaultAvatar from "../../asset/default.jpg";

class Profile extends Component {
   state = {
      showed: true,
      imageValue: "",
      base64ImageUrl: "",
   };

   previewImage = (image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
         this.setState({ base64ImageUrl: reader.result });
      };
   };

   // Set Image Value
   setImageValueHandler = (event) => {
      const imageFile = event.target.files[0];
      this.setState({ imageValue: imageFile });
      this.previewImage(imageFile);
   };

   showModal = () => {
      this.setState((preState) => ({
         showed: !preState.showed,
      }));
   };

   editAvatar = () => {
      console.log("editAvatar");
   };

   render() {
      const userAvatar = this.props.avatar ? this.props.avatar : defaultAvatar;
      const modal = (
         <Modal showed={this.state.showed} clicked={this.showModal}>
            <section className="uploadAvatarModal">
               <h2 className="text-2xl font-bold mb-3">Edit Your Avatar</h2>
               <div>
                  <input type="file" onChange={this.setImageValueHandler} />
               </div>
               {this.state.base64ImageUrl ? (
                  <div className="w-28 h-28 my-3">
                     <img
                        src={this.state.base64ImageUrl}
                        alt="Preview Avatar"
                        className="w-full h-full"
                     />
                  </div>
               ) : (
                  <div className="w-28 h-28 my-3">
                     <img
                        src={defaultAvatar}
                        alt="Default Avatar"
                        className="w-full h-full"
                     />
                  </div>
               )}
               <div className="flex justify-end">
                  <button onClick={this.editAvatar}>Confirm</button>
               </div>
            </section>
         </Modal>
      );
      const profile = (
         <div>
            {modal}
            <section className="Profile w-full flex flex-col justify-center items-center">
               <div className="w-44 h-44 mb-4 relative">
                  <img
                     src={userAvatar}
                     alt="User Profile"
                     className="w-full h-full rounded-full"
                  />
                  <i
                     className="fas fa-pencil-alt  absolute right-0 bottom-0 cursor-pointer"
                     onClick={this.showModal}
                  ></i>
               </div>
               <div className="Profile__Body w-96 text-center tracking-wide text-xl">
                  <p className="text-3xl font-bold">{this.props.name}</p>
                  <p className="font-bold">{this.props.email}</p>
                  <p className="leading-normal">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Dignissimos assumenda fugit eos ullam ipsa inventore!
                  </p>
               </div>
            </section>
         </div>
      );
      return profile;
   }
}

const stateToProps = (state) => {
   return {
      name: state.auth.name,
      email: state.auth.email,
      avatar: state.auth.avatar,
   };
};

export default connect(stateToProps)(Profile);
