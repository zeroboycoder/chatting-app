import * as actionTypes from "../action/actionTypes";

const initState = {
   flashMessage: "",
   flashType: "",
};

export const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.FLASH_START:
         return {
            flashMessage: action.flashMsg,
            flashType: action.flashType,
         };
      case actionTypes.FLASH_END:
         return {
            flashMessage: "",
            flashType: "",
         };
      default:
         return state;
   }
};
