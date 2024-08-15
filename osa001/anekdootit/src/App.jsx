import { useState } from 'react'

const RandomButton = ({handle}) =>
  <button onClick={handle}>next anecdote</button>
  
const VoteButton = ({handle}) =>
  <button onClick={handle}>vote</button>

const Anecdotes = ({anecdotes, votes}) => {
  return (
    <div>
      <h2>
        Anecdote of the day
      </h2>
      {anecdotes}
      <div>
        has {votes} votes
        </div>
    </div>
  )
}

const MostAnecdotes = ({anecdotes, votes}) => {
  return (
    <div>
      <h2>
        Anecdote with most votes
      </h2>
      {anecdotes}
      <div>
        has {votes} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleRandomClick = () => {
    const updateSelected = Math.floor( Math.random() * anecdotes.length )
    setSelected(updateSelected)
  }
  
  const handleVoteClick = () => {
    const copyPoints = [...points] 
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  const mostVotesIndex = points.indexOf( Math.max(...points) )

  return (
    <div>
      <Anecdotes anecdotes={anecdotes[selected]} votes={points[selected]}/>
      <div>
        <VoteButton handle={handleVoteClick} />
        <RandomButton handle={handleRandomClick} />
      </div>
      <MostAnecdotes anecdotes={anecdotes[mostVotesIndex]} votes={points[mostVotesIndex]}/>
    </div>
  )
}

export default App