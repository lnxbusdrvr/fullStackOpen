import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Togglable from '../components/Toggable';
import NewBlogForm from '../components/NewBlog';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      {blogs.map(blog => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
