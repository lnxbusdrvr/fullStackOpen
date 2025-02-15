const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    dummy: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
    name: String!
    setBornTo: Int!
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async () => {
      return Book.find({})
    },
    allAuthors: async () => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      let filter = {} // js object called filter
      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (!author)
          return []

        // set filter to authors.name
        filter.author = author._id
      }

      if (args.genres)
        filter.genres = { $in: [args.genre] } // set only books by genre

      return await Book.find(filter)

    },
    dummy: () => 0
  },
  Author: {
    bookCount: async (a) => {
      return await Book.collection.countDocuments({ name: a.name })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const newBook = new Book({
        title: args.title,
        author: author.name,
        published: args.published,
        genres: args.genres
      })

      books = books.concat(newBook)

      if (!authors.find(b => b.name === args.author)) {
        const newAuthor = { name: args.author, id: uuid() }
        authors = authors.concat(newAuthor)
      }

      return newBook
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
        if (!author)
          return null

        const updatedAuthor = { ...args, born: args.setBornTo}
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        return updatedAuthor 
    }
  }
    
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
