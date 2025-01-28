import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateVote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      dispatch({ type: 'SET_NOTIFICATION', payload: `You added a new anecdote: "${data.content}"`})
      setTimeout(() => {
        dispatch({ type: 'CLEAR'})
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'too short anecdote, must have at length 5 or more'})
      setTimeout(() => {
        dispatch({ type: 'CLEAR'})
      }, 5000)
    }
  })

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote "${data.content}" voted`})
      setTimeout(() => {
        dispatch({ type: 'CLEAR'})
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isLoading)
    return <div>loading data...</div>

  if ( result.isError)
    return <div>anecdote service not available due to problem in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
