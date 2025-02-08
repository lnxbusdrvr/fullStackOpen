import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlog';
import Togglable from './components/Toggable';
import loginService from './services/loginService';
import blogService from './services/blogs';

import LoginForm from './components/LoginFormComponent';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        setBlogs( blogs );
      });
    } else {
      setBlogs([]);
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window
      .localStorage
      .getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setNotifyMessage('login ok');
      setIsError(false);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
      setUsername('');
      setPassword('');
      console.log(`logging in with ${username} ${password}}`);
    } catch {
      setNotifyMessage('wrong credentials');
      setIsError(true);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
    }

  };

  const handleLogout = async () => {
    try {
      window.
        localStorage
        .removeItem('loggedBlogappUser');
      setUser(null);
    } catch {
      setNotifyMessage('Can\'t logout');
      setIsError(true);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNotifyMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`);
        setIsError(false);
        setTimeout(() => {
          setNotifyMessage(null);
        }, 5000);
      });
  };

  const addLike = (id) => {
    const updatedBlog = blogs.find(b => b.id === id);
    const changedBlog = { ...updatedBlog, likes: updatedBlog.likes + 1 };
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        const wholeBlog = { ...returnedBlog, user: updatedBlog.user };
        setBlogs(blogs.map(blog => blog.id !== id ? blog : wholeBlog ));
        setNotifyMessage(`new like to ${updatedBlog.title} by ${updatedBlog.author} added`);
        setIsError(false);
        setTimeout(() => {
          setNotifyMessage(null);
        }, 5000);
      });
  };

  const removeBlog = (id, title, name) => {
    if (window.confirm(`Remove blog "${title}" by ${name}?`)) {
      blogService
        .erase(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id));
          setNotifyMessage(`${title} by ${name} deleted`);
          setIsError(false);
          setTimeout(() => {
            setNotifyMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      {!user && (
        <>
          <h2>log in to application</h2>
          {notifyMessage && (
            <Notification message={notifyMessage} isError={isError} />
          )}
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          {notifyMessage && (
            <Notification message={notifyMessage} isError={isError} />
          )}
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogFormRef} >
            <NewBlogForm createBlog={addBlog} />
          </Togglable>

          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => addLike(blog.id)}
                removeBlog={() => removeBlog(blog.id, blog.title, blog.user.name)}
                loggedUser={user}
              />
            ))}
        </>
      )}
    </div>
  );
};

/*
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => addLike(blog.id)}
                removeBlog={() => removeBlog(blog.id, blog.title, blog.user.name)}
                loggedUser={user}
              />
          */

export default App;
