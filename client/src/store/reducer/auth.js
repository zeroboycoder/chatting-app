import * as actionTypes from "../action/actionTypes";

const initState = {
   userId: "",
   name: "",
   email: "",
   loading: false,
};

export const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.LOAD_USER_START:
      case actionTypes.SIGNUP_START:
      case actionTypes.SIGNIN_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.LOAD_USER_SUCCESS: {
         return {
            ...state,
            userId: action.user._id,
            name: action.user.name,
            email: action.user.email,
            loading: false,
         };
      }
      case actionTypes.LOAD_USER_FAIL: {
         return {
            ...state,
            loading: false,
         };
      }
      case actionTypes.SIGNUP_SUCCESS:
      case actionTypes.SIGNIN_SUCCESS: {
         localStorage.setItem("token", action.token);
         return {
            ...state,
            userId: action.user._id,
            name: action.user.name,
            email: action.user.email,
            loading: false,
         };
      }
      case actionTypes.SIGNUP_FAIL:
      case actionTypes.SIGNIN_FAIL:
      case actionTypes.LOGOUT_SUCCESS: {
         localStorage.removeItem("token");
         return {
            userId: "",
            name: "",
            email: "",
            loading: false,
         };
      }
      default:
         return state;
   }
};
