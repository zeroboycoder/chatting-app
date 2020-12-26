import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import "./tailwind.css";
import Layout from "./hoc/Layout";
import Home from "./container/Home/Home";
import Room from "./container/Room/Room";
import Profile from "./container/Profile/Profile";
import Signup from "./container/Auth/Signup/Signup";
import Signin from "./container/Auth/SignIn/Signin";
import { onLoadUser } from "./store/action/rootAction";

class App extends Component {
   componentDidMount() {
      if (localStorage.getItem("token")) {
         this.props.onLoadUser();
      } else {
         this.props.history.push("/signin");
      }
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
   };
};

export default connect(null, dispatchToProps)(withRouter(App));
