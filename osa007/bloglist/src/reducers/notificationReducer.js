import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return null
    }
  },
})

export const setNotification = (note, seconds, isErrorMessage) => {
  return async dispatch => {
    dispatch(set({note, isErrorMessage}))
    setTimeout(()=> {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { set, clear } = slice.actions
export default slice.reducer
