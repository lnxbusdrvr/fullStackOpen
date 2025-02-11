import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, Routes, Route} from 'react-router-dom';

import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginFormComponent';
import Users from './components/UsersComponent';
import User from './components/User';

import blogService from './services/blogService';

import { initializeBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { setUser, clearUser } from './reducers/userReducer';

import storage from './services/storageService';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storage1User = storage.loadUser();
    if (storage1User)
      dispatch(setUser(user));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    storage.removeUser();
    dispatch(clearUser());
    dispatch(setNotification(`Bye bye!`, 5, false));
  };


  return (
    <div>
      {!user ? (
        <LoginForm setUser={setUser} />
      ) : (
        <>
          <nav style={{backgroundColor: 'grey', padding: '0.5em'}}>
            <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name} logged in <button onClick={handleLogout}>logout</button>
          </nav>
          <h2>blog app</h2>

          <Notification  />

          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </>
      )}
    </div>
  );
};
/*
*/

export default App;
