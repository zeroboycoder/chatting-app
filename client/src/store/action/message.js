import axios from "axios";
import * as actionTypes from "./actionTypes";
import { onFlash } from "./rootAction";

// Load Messages
const loadMessagesStart = () => {
   return {
      type: actionTypes.LOAD_MESSAGES_START,
   };
};

const loadMessagesSuccess = (roomId, data) => {
   return {
      type: actionTypes.LOAD_MESSAGES_SUCCESS,
      messages: data.messages,
      roomId,
      roomName: data.roomName,
   };
};

const loadMessagesFali = () => {
   return {
      type: actionTypes.LOAD_MESSAGES_FAIL,
   };
};

export const onLoadMessages = (roomId) => (dispatch) => {
   dispatch(loadMessagesStart());
   try {
      axios.get(`/api/loadMessages/${roomId}`).then((response) => {
         dispatch(loadMessagesSuccess(roomId, response.data));
      });
   } catch (error) {
      dispatch(loadMessagesFali());
   }
};

// Sent Message to Server
const sentMessageSuccess = () => {
   return {
      type: actionTypes.SENT_MESSAGE_SUCCESS,
   };
};

const sentMessageFail = () => {
   return {
      type: actionTypes.SENT_MESSAGE_FAIL,
   };
};

export const onSentMessage = (data) => (dispatch) => {
   axios
      .post("/api/sentMessage", data)
      .then((response) => {
         dispatch(sentMessageSuccess());
      })
      .catch((err) => dispatch(sentMessageFail()));
};

// Add Message on Client
const addMessageSucess = (roomId, message) => {
   return {
      type: actionTypes.ADD_MESSAGE_SUCCESS,
      roomId,
      message,
   };
};

export const onAddMessage = (data) => (dispatch) => {
   try {
      dispatch(addMessageSucess(data.roomId, data.newMsg));
   } catch (error) {
      dispatch(onFlash("Add Message Fail(on client)", "fail"));
   }
};
