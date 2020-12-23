import axios from "axios";
import { onFlash, onLoadRoom } from "./rootAction";

export const onAddmember = (data) => (dispatch) => {
   axios
      .post("/api/addMember", data)
      .then((response) => {
         dispatch(onFlash("Add user success", "success"));
         dispatch(onLoadRoom());
      })
      .catch((error) => dispatch(onFlash(error.response.data.msg, "fail")));
};
