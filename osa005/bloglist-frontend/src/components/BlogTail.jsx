const BlogTail = ({ blog, addLike, removeBlog, loggedUser }) => {
  const removeStyle = {
    backgroundColor: 'CornflowerBlue',
    color: 'black',
    borderRadius: '0.5em',
    fontWeight: 'bold',
    padding: '0.1em 0.4em',
  };

  return (
    <div>
      <div>
        {blog.url}
      </div>
      <div data-testid='likesValue'>
        likes {blog.likes} <button data-testid='likeButton' onClick={addLike} >like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      {blog.user.username === loggedUser.username && (
        <button style={removeStyle} onClick={removeBlog} >remove</button>
      )}
    </div>
  );
};


export default BlogTail;
