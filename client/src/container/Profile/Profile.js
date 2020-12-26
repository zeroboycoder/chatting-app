import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";
import defaultAvatar from "../../asset/default.jpg";

class Profile extends Component {
   render() {
      const userAvatar = this.props.avatar ? this.props.avatar : defaultAvatar;
      return (
         <section className="Profile w-full flex flex-col justify-center items-center">
            <div className="Profile__Avatar w-44 h-44 mb-4">
               <img
                  src={userAvatar}
                  alt="User Profile"
                  className="w-full h-full rounded-full"
               />
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
      );
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
