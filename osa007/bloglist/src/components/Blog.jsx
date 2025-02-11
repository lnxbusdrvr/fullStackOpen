import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer';
import PropTypes from 'prop-types';
import { setNotification } from '../reducers/notificationReducer';

const Blog = () => {
  const [ newComment, setNewComment ] = useState('')
  const dispatch = useDispatch();
  const { id } = useParams(); // get id from url-object
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);
  const navigate = useNavigate()

  if (!blog || !user)
    return null;


  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`Liked blog '${blog.title} by ${blog.author}'`, 5, false));
  };

  const handleRemove = (id) => {
    dispatch(removeBlog(id));
    dispatch(setNotification(`Removed blog`, 5, false));
    navigate('/');
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      dispatch(addComment(id, newComment));
      dispatch(setNotification(`Added new comment`, 5, false));
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div data-testid="likesValue">
        {blog.likes} likes <button className="btn btn-primary" data-testid="likeButton" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      {blog.user.username === user.username && (
        <button className="btn btn-primary" onClick={() => handleRemove(blog.id)}>
          remove
        </button>
      )}
      <h3>comments</h3>

      <form onSubmit={handleCommentSubmit}>
        <div>
          <input
            type="text"
            value={newComment}
            onChange={event => setNewComment(event.target.value)}
          />
          <button type="sumbit">add comments</button>
        </div>
      </form>

      <ul>
        {blog.comments && blog.comments.length > 0
          ? (blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
        )))
          : (
          <li>no comment</li>
        )}
      </ul>
    </div>
  );
};


export default Blog;

