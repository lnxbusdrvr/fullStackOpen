import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      return action.payload;
    }
  }
});

export const { initializeUsers } = usersSlice.actions;
export default usersSlice.reducer;

