import { configureStore } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

import anecdoteReducer, { setAnecdotes } from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notifyReducer from '../reducers/notifyReducer'

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notifyReducer 
  }
})

anecdoteService.getAll().then(anecdotes => 
  store.dispatch(setAnecdotes(anecdotes ))
)
