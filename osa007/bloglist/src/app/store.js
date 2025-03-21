import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../reducers/notificationReducer';
import blogReducer from '../reducers/blogReducer';
import userReducer from '../reducers/userReducer';
import usersReducer from '../reducers/usersReducer';
 
export default configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }
});
