import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { EDIT_AUTHORS, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import Select from 'react-select'


const Authors = (props) => {
  // Need whole object, not just name
  const [ selectedAuthor, setSelectedAuthor ] = useState(null)
  const [ born, setBorn ] = useState('')
  const [ editAuthor ]= useMutation(EDIT_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const result = useQuery(ALL_AUTHORS)


  const addBorn = async (event) => {
    event.preventDefault()

    if (!selectedAuthor) {
      alert("Please select an author first")
      return
    }

    await editAuthor({
      variables: { name: selectedAuthor.value, setBornTo: Number(born) }
    })

    setSelectedAuthor(null)
    setBorn('')
  }

  if (!props.show)
    return null

  if (result.loading)
    return <div>loading...</div>

  const authors = result.data.allAuthors

  const authorOptions = authors.map(a => ({
    value: a.name,
    label: a.name
  }))


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
      {props.token &&
      (<form onSubmit={addBorn} >
        <h3>set birthyear</h3>
        <div>
          <Select
            options={authorOptions}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            placeholder="Select an author..."
            isClearable
            isSearcable
          /> 
        </div>
        <div>
          born <input value={born} name="born" onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>)}
    </div>
  )
}

export default Authors
