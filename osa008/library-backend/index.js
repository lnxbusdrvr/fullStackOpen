const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
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

  type User {
    username: String!
    favoriteGenre: String!
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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

      if (args.genre)
        filter.genres = { $in: [args.genre] } // set only books included by genre

      return await Book.find(filter).populate('author')

    },
    me: (root, args, context) => {
      return context.currentUser
    },
    dummy: () => 0
  },
  Author: {
    bookCount: async (a) => {
      return await Book.collection.countDocuments({ author: a._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Login please', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const newBook = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres
      })

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }
      return newBook.populate('author')
    },
    editAuthor: async (root, args, context) => {
      if (context.currentUser) {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )

        if (!author) {
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }
        return author
      } else {
        throw new GraphQLError('Login please', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User(
        { username: args.username,
          favoriteGenre: args.favoriteGenre
        })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res}) => {
    const auth = req
      ? req.headers.authorization
      : null

    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
