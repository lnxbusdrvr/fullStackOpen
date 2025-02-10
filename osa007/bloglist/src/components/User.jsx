import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const User = () => {
  const { id } = useParams() // get id from url-object
  const users = useSelector((state) => state.users)
  const blogs = useSelector(state => state.blogs);
  const navigate = useNavigate()
  const user = users.find(u => u.id === id)
  const userBlog = blogs.filter(b => b.user.id === id)

  if (!user)
    return null

  return (
    <div>
      <h2>{user.name}</h2>
      <p style={{ fontWeight: 'bold' }}>added blogs</p>
      {userBlog.map(blog => (
        <ul>
          <li key={blog.id}>{blog.title}</li>
        </ul>
      ))}
      <button onClick={() => navigate('/users')}>cancel</button>
    </div>
  );
};

export default User

