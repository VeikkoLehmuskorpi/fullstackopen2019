const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const jwt = require('jsonwebtoken');
const Book = require('./models/bookSchema');
const Author = require('./models/authorSchema');
const User = require('./models/userSchema');

console.log(`Connecting to MongoDB...`);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Error connecting to MongoDB: ${error.message}`));

const typeDefs = gql`
  type Mutation {
    addBook(title: String, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String!]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
`;

const resolvers = {
  Query: {
    bookCount: () => {
      return Book.collection.countDocuments();
    },
    authorCount: () => {
      return Author.collection.countDocuments();
    },
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author');
      }

      if (args.genre) {
        return Book.find({
          genres: { $in: args.genre },
        }).populate('author');
      }

      /**
       * @TODO Filter by args.author and args.author && args.genre
       */
    },
    allAuthors: () => {
      return Author.find({});
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Invalid credentials');
      }

      const book = new Book({ ...args });

      const existingAuthor = await Author.findOne({ name: args.author });
      if (!existingAuthor) {
        try {
          const author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      try {
        const author = await Author.findOne({ name: args.author });
        book.author = author._id;
        book.populate('author');
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Invalid credentials');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new UserInputError({
          invalidArgs: args,
        });
      }

      author.name = args.name;
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, password: 'placeholderpassword' });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    login: async (root, args) => {
      if (!args.username || args.password !== 'placeholderpassword') {
        throw new AuthenticationError('Invalid credentials');
      }

      const user = await User.findOne({ username: args.username });

      const userForToken = {
        username: args.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
