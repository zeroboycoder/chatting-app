import * as actionTypes from "../action/actionTypes";

const initState = {
   messages: {},
   roomName: "",
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.LOAD_MESSAGES_SUCCESS:
         return {
            ...state,
            messages: {
               [action.roomId]: action.messages,
            },
            roomName: action.roomName,
         };
      case actionTypes.ADD_MESSAGE_SUCCESS:
         return {
            ...state,
            messages: {
               ...state.messages,
               [action.roomId]: state.messages[action.roomId].concat(
                  action.message
               ),
            },
         };
      default:
         return state;
   }
};

export default reducer;
