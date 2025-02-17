import React,  { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from "@apollo/client"
import { ME, ALL_BOOKS_GENRE } from '../queries'

const Recommendations = (props) => {
  const resultMe = useQuery(ME)
  const [ askBooksQuery, resultBooks ] = useLazyQuery(ALL_BOOKS_GENRE)
  const [ favoriteGenreBooks, setFavoriteGenreBooks ] = useState([])

  // Get books query according by genre
  useEffect(() => {
    /* Don't sign variable eg. me = resultMe.data,
     * cause it might be undefined, use direct instead*/
    if (resultBooks.data)
      setFavoriteGenreBooks(resultBooks.data.allBooks)
  }, [favoriteGenreBooks, resultBooks])

  // Get user's setFavoriteGenre, when ME is ready
  useEffect(() => {
    /*
     * optional chaining? makes actually things work*/
    if (resultMe.data?.me?.favoriteGenre)
      askBooksQuery({ variables: { genre: resultMe.data.me.favoriteGenre } })
    }, [askBooksQuery, resultMe])


  if (!props.show)
    return null

  if (resultMe.loading || resultBooks.loading)
    return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{resultMe.data.me.favoriteGenre}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteGenreBooks.length > 0 && favoriteGenreBooks?.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author?.name || 'ei'}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
/*
*/

export default Recommendations
