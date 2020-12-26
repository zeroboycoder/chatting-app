import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Toolbar.css";
import logo from "../../../asset/logo.png";
import { onLogout } from "../../../store/action/rootAction";

const Toolbar = (props) => {
   const [showDropDown, setShowDropDown] = useState({ value: false });
   const toggleDropDown = () => {
      const showValue = showDropDown.value;
      setShowDropDown({ value: !showValue });
   };

   // Go to Home page when press brand logo
   const goToHomePage = () => {
      props.history.push("/");
   };

   // Logout Function
   const logoutFun = () => {
      props.onLogout(props);
      toggleDropDown();
   };

   let auth = <NavLink to="/signin">Sign In</NavLink>;
   if (localStorage.getItem("token")) {
      auth = (
         <li>
            <span onClick={toggleDropDown}>{props.username} </span>
            <ul
               className="dropdown"
               style={
                  showDropDown.value
                     ? { display: "block" }
                     : { display: "none" }
               }
            >
               <li>
                  <NavLink to="/profile" onClick={toggleDropDown}>
                     <i className="far fa-user-circle"></i>Profile
                  </NavLink>
               </li>
               <li>
                  <span className="Toolbar__Logout" onClick={logoutFun}>
                     <i className="fas fa-sign-out-alt"></i>Logout
                  </span>
               </li>
            </ul>
         </li>
      );
   }

   return (
      <div className="Toolbar w-full">
         <div className="w-10/12 mx-auto flex justify-between items-center">
            <div className="cursor-pointer" onClick={goToHomePage}>
               <img src={logo} alt="Logo" className="w-9 h-9" />
            </div>
            <ul className="Toolbar__NavUl">
               <li>
                  <NavLink to="/" exact>
                     Rooms
                  </NavLink>
               </li>
               {auth}
            </ul>
         </div>
      </div>
   );
};

const stateToProps = (state) => {
   return {
      username: state.auth.name,
   };
};

const dispatchToProps = (dispatch) => {
   return {
      onLogout: (props) => dispatch(onLogout(props)),
   };
};

export default connect(stateToProps, dispatchToProps)(withRouter(Toolbar));
