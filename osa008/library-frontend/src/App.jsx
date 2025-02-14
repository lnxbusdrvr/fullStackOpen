import { useState } from "react";
import { gql, useQuery, useMutation } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      author
      published
    }
  }
`

//
const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      id
      genres
    }
  }
`
//

const App = () => {
  const [page, setPage] = useState("authors");
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }]
  })

  if (resultAuthors.loading || resultBooks.loading)
    return <div>loading...</div>


/*
 
      <NewBook show={page === "add"} />
 */
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={resultAuthors.data.allAuthors}/>

      <Books show={page === "books"} books={resultBooks.data.allBooks} />

      <NewBook show={page === "add"} createBook={createBook}/>
    </div>
  );
};

export default App;
