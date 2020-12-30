import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./SideDraw.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import defaultAvatar from "../../../asset/default.jpg";
import { onLogout } from "../../../store/action/rootAction";

const SideDraw = (props) => {
   const userAvatar = props.avatar ? props.avatar : defaultAvatar;

   // Go To Profile
   const goToProfile = () => {
      props.history.push("/profile");
   };

   //Logout Function
   const logoutFun = () => {
      props.onLogout(props);
   };

   let authNav;
   if (props.name) {
      authNav = (
         <React.Fragment>
            <li>
               <NavLink to="/" exact>
                  Rooms
               </NavLink>
            </li>
            <li className="SideDraw__Nav__Logout text-red-500">
               <div className="cursor-pointer" onClick={logoutFun}>
                  Logout
               </div>
            </li>
         </React.Fragment>
      );
   } else {
      authNav = (
         <React.Fragment>
            <li className="text-green-500">
               <NavLink to="/signin">SignIn</NavLink>
            </li>
            <li className="text-green-500">
               <NavLink to="/signup">SignUp</NavLink>
            </li>
         </React.Fragment>
      );
   }

   return (
      <React.Fragment>
         <Backdrop showed={props.showed} clicked={props.toggleSideDraw} />
         <section
            className="SideDraw flex flex-col items-center"
            style={
               props.showed
                  ? { transform: "translateX(0)" }
                  : { transform: "translateX(100%)" }
            }
            onClick={props.toggleSideDraw}
         >
            <div className="SideDraw__Body__Avatar">
               <img src={userAvatar} alt="Avatar" onClick={goToProfile} />
            </div>
            <ul className="SideDraw__Nav text-center">
               <li>
                  <NavLink to="/profile">{props.name}</NavLink>
               </li>
               {authNav}
            </ul>
         </section>
      </React.Fragment>
   );
};

const stateToProps = (state) => {
   return {
      avatar: state.auth.avatar,
      name: state.auth.name,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onLogout: (props) => dispatch(onLogout(props)),
   };
};

export default connect(stateToProps, dispatchToProps)(withRouter(SideDraw));
