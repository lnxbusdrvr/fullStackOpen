import { useQuery, useMutation } from "@apollo/client"
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const result = useQuery(ME)
  const resultBooks = useQuery(ALL_BOOKS)

  if (!props.show)
    return null

  if (result.loading)
    return <div>loading...</div>

  if (resultBooks.loading)
    return <div>loading...</div>

  const me = result.data.me

  const favoriteGenre = me.favoriteGenre

  const books = resultBooks.data.allBooks.filter(b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{favoriteGenre}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
