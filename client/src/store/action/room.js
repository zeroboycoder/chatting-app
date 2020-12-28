import axios from "axios";
import * as actionTypes from "./actionTypes";
import { onFlash } from "./rootAction";

const header = (token) => {
   return {
      headers: {
         chat_auth: ["zeroboy", token],
      },
   };
};

// ==========
// Load Rooms
// ==========
const loadRoomStart = () => {
   return {
      type: actionTypes.LOAD_ROOMS_START,
   };
};

const loadRoomSuccess = (rooms) => {
   return {
      type: actionTypes.LOAD_ROOMS_SUCCESS,
      rooms,
   };
};

const loadRoomFail = () => {
   return {
      type: actionTypes.LOAD_ROOMS_FAIL,
   };
};

export const onLoadRoom = () => (dispatch) => {
   const token = localStorage.getItem("token");
   dispatch(loadRoomStart());
   axios
      .get("/api/rooms/loadrooms", header(token))
      .then((response) => {
         dispatch(loadRoomSuccess(response.data.rooms));
      })
      .catch((err) => {
         dispatch(loadRoomFail());
         dispatch(onFlash("Load Room Fail", "fail"));
      });
};

// =========
// Join Room
// =========
const joinRoomStart = () => {
   return {
      type: actionTypes.JOIN_ROOMS_START,
   };
};

const joinRoomSuccess = () => {
   return {
      type: actionTypes.JOIN_ROOMS_SUCCESS,
   };
};

const joinRoomFail = () => {
   return {
      type: actionTypes.JOIN_ROOMS_FAIL,
   };
};

export const onJoinRoom = (data) => (dispatch) => {
   const token = localStorage.getItem("token");
   dispatch(joinRoomStart());
   axios
      .post("/api/rooms/joinroom", data, header(token))
      .then((response) => {
         dispatch(joinRoomSuccess());
         dispatch(onLoadRoom());
      })
      .catch((err) => {
         dispatch(joinRoomFail());
         dispatch(onFlash(err.response.data.msg, "fail"));
      });
};

// ===========
// Create Room
// ===========
const createRoomStart = () => {
   return {
      type: actionTypes.CREATE_ROOMS_START,
   };
};

const createRoomSuccess = () => {
   return {
      type: actionTypes.CREATE_ROOMS_SUCCESS,
   };
};

const createRoomFail = () => {
   return {
      type: actionTypes.CREATE_ROOMS_FAIL,
   };
};

export const onCreateRoom = (data) => (dispatch) => {
   const token = localStorage.getItem("token");
   dispatch(createRoomStart());
   axios
      .post("/api/rooms/createroom", data, header(token))
      .then((response) => {
         dispatch(createRoomSuccess());
         dispatch(onLoadRoom());
         dispatch(onFlash(`Room create successfully`, "success"));
      })
      .catch((err) => {
         dispatch(createRoomFail());
         dispatch(onFlash(err.response.data.msg, "fail"));
      });
};

// ===========
// Delete Room
// ===========
const deleteRoomStart = () => {
   return {
      type: actionTypes.DELETE_ROOM_START,
   };
};

const deleteRoomSuccess = () => {
   return {
      type: actionTypes.DELETE_ROOM_SUCCESS,
   };
};

const deleteRoomFail = () => {
   return {
      type: actionTypes.DELETE_ROOM_FAIL,
   };
};

export const onDeleteRoom = (roomId) => (dispatch) => {
   const token = localStorage.getItem("token");
   dispatch(deleteRoomStart());
   axios
      .delete(`/api/rooms/delete/${roomId}`, header(token))
      .then((response) => {
         dispatch(deleteRoomSuccess());
         dispatch(onFlash("Delete Room Success", "success"));
      })
      .catch((err) => {
         dispatch(deleteRoomFail());
         dispatch(onFlash(err.response.data.msg, "fail"));
      });
};
