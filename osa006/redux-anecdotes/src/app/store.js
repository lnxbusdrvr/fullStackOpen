import { configureStore } from '@reduxjs/toolkit'


import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notifyReducer from '../reducers/notifyReducer'

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notifyReducer 
  }
})
