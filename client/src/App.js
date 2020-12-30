import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import "./App.css";
import "./tailwind.css";
import Layout from "./hoc/Layout";
import Home from "./container/Home/Home";
import Room from "./container/Room/Room";
import Profile from "./container/Profile/Profile";
import Signup from "./container/Auth/Signup/Signup";
import Signin from "./container/Auth/SignIn/Signin";
import { onLoadUser, onAddMessage } from "./store/action/rootAction";

class App extends Component {
   componentDidMount() {
      if (localStorage.getItem("token")) {
         this.props.onLoadUser();
      } else {
         this.props.history.push("/signin");
      }

      // For Socket IO Client
      const socket = io("http://localhost:5000");
      // const socket = io("https://me3t.herokuapp.com/");
      socket.on("createMsg", (data) => {
         alert("Hello");
         this.props.onAddMessage(data);
      });
   }

   render() {
      return (
         <Layout>
            <Switch>
               <Route path="/signup" component={Signup} />
               <Route path="/signin" component={Signin} />
               <Route path="/profile" component={Profile} />
               <Route path="/rooms/:roomId" component={Room} />
               <Route path="/" exact component={Home} />
            </Switch>
         </Layout>
      );
   }
}

const dispatchToProps = (dispatch) => {
   return {
      onLoadUser: () => dispatch(onLoadUser()),
      onAddMessage: (data) => dispatch(onAddMessage(data)),
   };
};

export default connect(null, dispatchToProps)(withRouter(App));
