import { useQuery } from '@apollo/client'
import { useState } from "react";
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState(null)

  if (!props.show)
    return null

  if (result.loading)
    return <div>loading...</div>

  const books = result.data.allBooks

  const allGenres = [...new Set(books.flatMap(book => book.genres))]

  const filteredBooks = genre
    ? books.filter(b => b.genres.includes(genre))
    : books


  return (
    <div>
      <h2>books</h2>
      <div>
        in gernre <strong>{genre ? genre : "all genres"}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {allGenres.length > 0 && allGenres.map((g, idx) => {
        return (
          <button key={`genre-${idx}`} onClick={() => setGenre(g)}>{g}</button>
        )
      })}
      <button key="all genres" onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}
/*
        <button onClick={() => setGenre(g)}>pattern</button>
        */
export default Books
