import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { setNotification } from '../reducers/notificationReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // get id from url-object
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);
  const navigate = useNavigate()

  if (!blog || !user)
    return null;

  const removeStyle = {
    backgroundColor: 'CornflowerBlue',
    color: 'black',
    borderRadius: '0.5em',
    fontWeight: 'bold',
    padding: '0.1em 0.4em',
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`Liked blog '${blog.title} by ${blog.author}'`, 5, false));
  };

  const handleRemove = (id) => {
    dispatch(removeBlog(id));
    dispatch(setNotification(`Removed blog`, 5, false));
    navigate('/');
  };

  return (
    <div key={blog.id}>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div data-testid="likesValue">
        {blog.likes} likes{" "}
        <button data-testid="likeButton" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      {blog.user.username === user.username && (
        <button style={removeStyle} onClick={() => handleRemove(blog.id)}>
          remove
        </button>
      )}
    </div>
  );
};

Blog.propType = {
  users: PropTypes.string.isRequired,
};

export default Blog;

