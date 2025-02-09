import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer';

const NewBlog = ({ createBlog }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');


  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createNewBlog({ title: newTitle, author: newAuthor, url: newUrl }))
    dispatch(setNotification(`added new blog '${newTitle} by ${newAuthor}'`, 5, false));
    clearInputs()
  };

  const clearInputs = () => {
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={clearInputs}>reset</button>
      </form>
    </div>
  );
};


export default NewBlog;
