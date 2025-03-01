const { GraphQLError } = require('graphql')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
//const BOOK_ADDED = 'BOOK_ADDED'


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
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  }
}


module.exports = resolvers

