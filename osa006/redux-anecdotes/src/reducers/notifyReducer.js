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
export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(notifyMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000) 
  }
}

export const { notifyMessage, clearNotification } = notifySlice.actions 
export default notifySlice.reducer
