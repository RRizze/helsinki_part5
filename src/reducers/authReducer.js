import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import { addNotification } from './notificationReducer';

const user = JSON.parse(window.localStorage.getItem('loggedUser'));
const initialState = user ? user : null;

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

const { addUser, removeUser } = loginSlice.actions;

// TODO: find out where to store localStorage operations
// (mb localStorageService?)
export const login = (user) => {
  return async (dispatch, getState) => {
    try {
      const loggedUser = await loginService.login(user);

      dispatch(addUser(loggedUser));

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      // TODO: remove token from here
      blogsService.setToken(loggedUser.token);

      dispatch(
        addNotification({
          message: 'Login success',
          error: false,
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          message: 'Wrong username or password',
          error: true,
        })
      );
    }
  };
};

export const addUserFromLocalStore = () => {
  return (dispatch, getState) => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      const userObj = JSON.parse(loggedUser);
      dispatch(addUser(userObj));
      blogsService.setToken(userObj.token);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('loggedUser');

    dispatch(removeUser());

    blogsService.setToken(null);
  };
};

export const getUser = (state) => state.auth;

export default loginSlice.reducer;
