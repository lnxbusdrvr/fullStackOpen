import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types';
import { setNotification } from '../reducers/notificationReducer';

const BlogTail = () => {
  const dispatch = useDispatch()
  const { id } = useParams() // get id from url-object
  const users = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const user = users.find(u => u.id === id)
  const blog = blogs.filter(b => b.user.id === id)

  const removeStyle = {
    backgroundColor: 'CornflowerBlue',
    color: 'black',
    borderRadius: '0.5em',
    fontWeight: 'bold',
    padding: '0.1em 0.4em',
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked blog '${blog.title} by ${blog.author}'`, 5, false));
  }

  const handleRemove = (id) => {
    dispatch(removeBlog(id))
    dispatch(setNotification(`Removed blog`, 5, false));
  }

  return (
    <div>
      <div>
        {blog.url}
      </div>
      <div data-testid='likesValue'>
        likes {blog.likes} <button data-testid='likeButton' onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      {blog.user.username === users.username && (
        <button style={removeStyle} onClick={() => handleRemove(blog.id)}>remove</button>
      )}
    </div>
  );
};

BlogTail.propType = {
  users: PropTypes.string.isRerquired,
};


export default Blog;
