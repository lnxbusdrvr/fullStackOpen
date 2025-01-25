import { useEffect } from 'react'
import Header from './components/Header'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
    useEffect(() => {
      anecdoteService
        .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [])

  return (
    <div>
      <Header />
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
