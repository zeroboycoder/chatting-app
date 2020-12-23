import * as actionTypes from "../action/actionTypes";

const initStart = {
   rooms: [],
   loading: false,
};

export const reducer = (state = initStart, action) => {
   switch (action.type) {
      case actionTypes.LOAD_ROOMS_START:
      case actionTypes.JOIN_ROOMS_START:
      case actionTypes.CREATE_ROOMS_START:
         return {
            ...state,
            loading: true,
         };
      case actionTypes.LOAD_ROOMS_SUCCESS:
         return {
            ...state,
            rooms: action.rooms,
            loading: false,
         };
      case actionTypes.LOAD_ROOMS_FAIL:
      case actionTypes.JOIN_ROOMS_FAIL:
      case actionTypes.CREATE_ROOMS_FAIL:
         return {
            ...state,
            loading: false,
         };
      default:
         return state;
   }
};
