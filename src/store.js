import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import authReducer from './reducers/authReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    auth: authReducer,
    notification: notificationReducer,
    users: usersReducer,
    // TODO: togglablereducer / filter ?
  },
});
export default store;
