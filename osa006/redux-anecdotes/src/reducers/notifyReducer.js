import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notification',
  initialState: 'Hello World',
  reducers: {
    notifyMessage(action) {
      return action.payload
    }
  }
})

export const { notifyMessage } = notifySlice.actions 
export default notifySlice.reducer
