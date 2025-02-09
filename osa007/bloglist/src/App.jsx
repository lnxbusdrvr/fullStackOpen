import { useDispatch } from 'react-redux'

import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlog';
import Togglable from './components/Toggable';
import loginService from './services/loginService';
import blogService from './services/blogService';
import LoginForm from './components/LoginFormComponent';

import { setNotification } from './reducers/notificationReducer'

import storage from './services/storageService';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    const user = storage.loadUser();
    if (user) setUser(user);
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs));
    } else {
      setBlogs([]);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
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
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
