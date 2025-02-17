import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_GENRE } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [getBooksGenreSearch, resultGenreSearch] = useLazyQuery(ALL_BOOKS_GENRE)
  const [genre, setGenre ] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  // update filtered books on genre changes
  useEffect(() => {
    if (genre)
      getBooksGenreSearch({ variables: { genre }})
    else if (result.data?.allBooks)
      setFilteredBooks(result.data.allBooks)
  }, [genre, getBooksGenreSearch, result.data])

  useEffect(() => {
    if (resultGenreSearch.data)
      setFilteredBooks(resultGenreSearch.data.allBooks)
  }, [resultGenreSearch])

  if (!props.show)
    return null

  if (result.loading || resultGenreSearch.loading)
    return <div>loading...</div>

  const allGenres = [...new Set(result.data.allBooks.flatMap(book => book.genres))]


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
      <button key="all genres" onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}
/*
        */
export default Books
