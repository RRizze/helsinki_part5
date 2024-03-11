import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { setUsers, addUser } = usersSlice.actions;

export const getAllUsers = (state) => state.users;
export const getUser = (id) => (state) => {
  return state.users.find((user) => user.id === id);
};

export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users));
  };
};

export const fetchUserById = (id) => {
  return async (dispatch, getState) => {
    const user = await usersService.getUserById(id);
    dispatch(addUser(user));
  };
};

export default usersSlice.reducer;
