import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    replaceBlog(state, action) {
      const updated = action.payload;
      return state.map(b => b.id === updated.id ? updated : b);
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    }
  },
});

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog);
    dispatch(addBlog(blog));
  };
};

export const addComment = (id, newComment) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find(b => b.id === id);
    const updatedBlog = { ...blog, comments: [ ...blog.comments, newComment ] };
    await blogService.update(id, updatedBlog);
    dispatch(replaceBlog(updatedBlog))
  }
}

export const likeBlog = (blog) => {
  const toLike = { ...blog, likes: blog.likes + 1};
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, toLike);
    dispatch(replaceBlog({ ...updatedBlog, user: blog.user }));
  };
};

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const { setBlogs, addBlog, replaceBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
