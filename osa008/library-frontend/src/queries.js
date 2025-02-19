import { gql } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`


export const BOOK_ADDED = gql`
  subscription {
    BookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      author{
        name
      }
      published
      genres
    }
  }
`
export const ALL_BOOKS_GENRE = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
    ...BookDetails

    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const EDIT_AUTHORS = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
