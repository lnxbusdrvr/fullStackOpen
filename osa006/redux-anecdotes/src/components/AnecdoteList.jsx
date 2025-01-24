import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifyReducer'

const Anecdote = ({ anecdote, handleVoteClick}) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes} <button onClick={handleVoteClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter)
      return anecdotes

    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })


  return(
    <div>
      {anecdotes
        .slice() // Make copy, so original state won't change
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteClick={ () => {
            dispatch( voteAnecdote(anecdote.id) )
            dispatch( setNotification(`you voted "${anecdote.content}"`) )
          } }
        />
      )}
    </div>
  )
}

export default AnecdoteList

