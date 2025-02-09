import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlog';
import Togglable from './components/Toggable';
import LoginForm from './components/LoginFormComponent';

import blogService from './services/blogService';

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'

import storage from './services/storageService';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef();

  useEffect(() => {
    const storage1User = storage.loadUser();
    if (storage1User)
      dispatch(setUser(user))
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)))
    }
  }, [user, dispatch])


  const handleLogout = () => {
    storage.removeUser();
    dispatch(clearUser())
    dispatch(setNotification(`Bye bye!`, 5, false));
  };

  return (
    <div>
      {!user ? (
        <LoginForm setUser={setUser} />
      ) : (
        <>
          <h2>blogs</h2>
          <Notification  />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <NewBlogForm />
          </Togglable>
          <Blog />
        </>
      )}
    </div>
  );
};

export default App;
