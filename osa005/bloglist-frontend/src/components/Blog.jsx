import { useState } from 'react';
import BlogTail from './BlogTail';
import PropTypes from 'prop-types';

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const [viewBlog, setViewBlog] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div data-testid='bloglist' style={blogStyle} >
      {blog.title} {blog.author} {viewBlog ?
        <button onClick={() => setViewBlog(false)}>hide</button> :
        <button onClick={() => setViewBlog(true)}>view</button>
      }
      {viewBlog &&
          <BlogTail
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
            loggedUser={loggedUser}
          />
      }
    </div>
  );
};

Blog.propType = {
  loggedUser: PropTypes.string.isRerquired,
};

export default Blog;
