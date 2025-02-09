import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types';
import { setNotification } from '../reducers/notificationReducer';

const BlogTail = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

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
      {blog.user.username === loggedUser.username && (
        <button style={removeStyle} onClick={() => handleRemove(blog.id)}>remove</button>
      )}
    </div>
  );
};

BlogTail.propType = {
  loggedUser: PropTypes.string.isRerquired,
};


export default BlogTail;
