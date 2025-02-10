import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react';
import { Link, Routes, Route} from 'react-router-dom'

import Blog from './components/Blog';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlog';
import Togglable from './components/Toggable';
import LoginForm from './components/LoginFormComponent';
import Users from './components/UsersComponent';
import User from './components/User';

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
            {user.name} logged in
          </p>
          <button onClick={handleLogout}>logout</button>
          <Link to="/"></Link><Link to="/users"></Link>

          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm />
          </Togglable>
          <Blog />
        </>
      )}
    </div>
  );
};
/*
*/

export default App;
