import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    error: false,
  },
  reducers: {
    add: (state, action) => {
      state.message = action.payload;
      return state;
    },
    remove: (state, action) => {
      return { message: '', error: false };
    },
  },
});

const { add, remove } = notificationSlice.actions;

export const addNotification = ({ message, timeout = 3500 }) => {
  return async (dispatch, getState) => {
    dispatch(add(message));

    await new Promise((resolve) => {
      setTimeout(() => {
        dispatch(remove());
      }, timeout);
    });
  };
};

export const getNotification = (state) => state.notification;

//export const removeNotification = (timeout = 3500) => {
//  return async (dispatch, getState) => {
//    await new Promise((resolve) => {
//      setTimeout(() => {
//        dispatch(remove());
//      }, timeout);
//    })
//  };
//};

export default notificationSlice.reducer;
