import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  const urlWithId = `${baseUrl}/${id}`
  const response = await axios.get(urlWithId)
  const anecdote = response.data

  const updatedVote = { ...anecdote, votes: anecdote.votes + 1 }
  const updatedResponse = await axios.put(urlWithId, updatedVote )
  return updatedResponse.data
}



export default {
  getAll,
  createNew,
  updateVote,
}
