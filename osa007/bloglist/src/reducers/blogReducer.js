import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { setBlogs } = slice.actions
export default slice.reducer
