import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notifyMessage(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

// Thunk
export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(notifyMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, delay * 1000)
  }
}

export const { notifyMessage, clearNotification } = notifySlice.actions 
export default notifySlice.reducer
