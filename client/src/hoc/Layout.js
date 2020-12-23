import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./Layout.css";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import Flash from "../components/Flash/Flash";

const Layout = (props) => {
   let flash;
   if (props.flashMessage && props.flashType) {
      flash = <Flash type={props.flashType}>{props.flashMessage}</Flash>;
   }
   return (
      <Fragment>
         {/* Toolbar */}
         <Toolbar />
         <div className="FixForNav"></div>
         {/* For Flash */}
         {flash}
         {/* Background gradient */}
         <div className="Layout__Bg"></div>
         {/* App.js */}
         {props.children}
      </Fragment>
   );
};

const stateToProps = (state) => {
   return {
      flashMessage: state.flash.flashMessage,
      flashType: state.flash.flashType,
   };
};

export default connect(stateToProps)(Layout);
