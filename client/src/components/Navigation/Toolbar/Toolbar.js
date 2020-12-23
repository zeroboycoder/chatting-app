import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Toolbar.css";
import logo from "../../../asset/logo.png";
import { onLogout } from "../../../store/action/rootAction";

const Toolbar = (props) => {
   // Go to Home page when press brand logo
   const goToHomePage = () => {
      props.history.push("/");
   };

   // Logout Function
   const logoutFun = () => {
      props.onLogout(props);
   };
   let auth = <NavLink to="/signin">Sign In</NavLink>;
   if (localStorage.getItem("token")) {
      auth = (
         <span className="Toolbar__Logout" onClick={logoutFun}>
            Logout
         </span>
      );
   }

   return (
      <div className="Toolbar w-full">
         <div className="w-10/12 mx-auto flex justify-between items-center">
            <div className="cursor-pointer" onClick={goToHomePage}>
               <img src={logo} alt="Logo" className="w-9 h-9" />
            </div>
            <div className="Toolbar__NavItems">
               <NavLink to="/" exact>
                  Rooms
               </NavLink>
               {auth}
            </div>
         </div>
      </div>
   );
};

const dispatchToProps = (dispatch) => {
   return {
      onLogout: (props) => dispatch(onLogout(props)),
   };
};

export default connect(null, dispatchToProps)(withRouter(Toolbar));
