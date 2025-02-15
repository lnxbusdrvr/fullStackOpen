import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import Select from 'react-select'

const EDIT_AUTHORS = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors

  // Need whole object, not just name
  const [ selectedAuthor, setSelectedAuthor ] = useState(null)
  const [ born, setBorn ] = useState('')
  const [ editAuthor ]= useMutation(EDIT_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

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
      <form onSubmit={addBorn} >
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
      </form>
    </div>
  )
}

export default Authors
