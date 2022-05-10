import { notifyAPI } from "../api/api";

const SET_NOTIFICATION = "notify/SET_NOTIFICATION";

const initialState = {
  notification: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

const setNotification = (notification) => ({
  type: SET_NOTIFICATION,
  payload: notification,
});

export const getNotification = (userid) => {
  return async (dispatch) => {
    const response = await notifyAPI.getNotification(userid);
    if (!response.resultCode) {
      dispatch(setNotification(response.notify));
    }
  };
};

export default notificationReducer;
