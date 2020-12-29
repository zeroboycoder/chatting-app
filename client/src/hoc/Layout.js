import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import "./Layout.css";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDraw from "../components/Navigation/SideDraw/SideDraw";
import Flash from "../components/Flash/Flash";

const Layout = (props) => {
   const [showSideDraw, setShowSideDraw] = useState({ showed: false });
   let flash;

   const toggleSideDrawHandler = () => {
      const showed = showSideDraw.showed;
      setShowSideDraw({ showed: !showed });
   };

   if (props.flashMessage && props.flashType) {
      flash = <Flash type={props.flashType}>{props.flashMessage}</Flash>;
   }

   return (
      <Fragment>
         {/* Toolbar */}
         <Toolbar toggleSideDraw={toggleSideDrawHandler} />
         <SideDraw
            showed={showSideDraw.showed}
            toggleSideDraw={toggleSideDrawHandler}
         />
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
