import axios from "axios";
import * as actionTypes from "./actionTypes";
import { onFlash } from "./flash";

// Load User
const loadUserStart = () => {
   return {
      type: actionTypes.LOAD_USER_START,
   };
};

const loadUserSuccess = (user) => {
   return {
      type: actionTypes.LOAD_USER_SUCCESS,
      user,
   };
};

const loadUserFail = (err) => {
   return {
      type: actionTypes.LOAD_USER_FAIL,
   };
};

export const onLoadUser = () => (dispatch) => {
   dispatch(loadUserStart());
   const token = localStorage.getItem("token");
   axios
      .get("/api/auth/user", {
         headers: {
            chat_auth: ["zeroboy", token],
         },
      })
      .then((response) => {
         dispatch(loadUserSuccess(response.data.user));
      })
      .catch((err) => {
         dispatch(loadUserFail());
      });
};

// Signup
const signupStart = () => {
   return {
      type: actionTypes.SIGNUP_START,
   };
};

const signupSuccess = (data) => {
   return {
      type: actionTypes.SIGNUP_SUCCESS,
      token: data.token,
      user: data.userObj,
   };
};

const signupFail = () => {
   return {
      type: actionTypes.SIGNUP_FAIL,
   };
};

export const onSignUp = (data, props) => (dispatch) => {
   dispatch(signupStart());
   axios
      .post("/api/auth/signup", data)
      .then((response) => {
         dispatch(onFlash("Welcome from chat room", "success"));
         dispatch(signupSuccess(response.data));
         props.history.push("/");
      })
      .catch((error) => {
         dispatch(onFlash(error.response.data, "fail"));
         dispatch(signupFail());
      });
};

// Signin
const signinStart = () => {
   return {
      type: actionTypes.SIGNIN_START,
   };
};

const signinSuccess = (data) => {
   return {
      type: actionTypes.SIGNIN_SUCCESS,
      token: data.token,
      user: data.userObj,
   };
};

const signinFail = () => {
   return {
      type: actionTypes.SIGNIN_FAIL,
   };
};

export const onSignin = (data, type, props) => (dispatch) => {
   let url;
   if (type === "normal") {
      url = "/api/auth/signin";
   }
   if (type === "facebook") {
      url = "/api/auth/signinwithfb";
   }
   dispatch(signinStart());
   axios
      .post(url, data)
      .then((response) => {
         dispatch(onFlash("Login successfully", "success"));
         dispatch(signinSuccess(response.data));
         props.history.push("/");
      })
      .catch((error) => {
         console.log(error);
         dispatch(onFlash(error.response, "fail"));
         dispatch(signinFail());
      });
};

// Logout
const logoutSuccess = () => {
   return {
      type: actionTypes.LOGOUT_SUCCESS,
   };
};

export const onLogout = (props) => (dispatch) => {
   dispatch(onFlash("Logout Successfully", "success"));
   dispatch(logoutSuccess());
   props.history.push("/signin");
};
