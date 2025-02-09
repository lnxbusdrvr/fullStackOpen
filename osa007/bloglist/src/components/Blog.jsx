import { useSelector } from 'react-redux';

import { useState } from 'react';
import BlogTail from './BlogTail';

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const [viewBlog, setViewBlog] = useState({});

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleView = (id) => {
    setViewBlog(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => toggleView(blog.id)}>
            {viewBlog[blog.id] ? 'hide' : 'view'}
          </button>

          {viewBlog[blog.id] && (
            <BlogTail
              blog={blog}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Blog;
