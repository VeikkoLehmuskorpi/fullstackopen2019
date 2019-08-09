const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Book = require('./models/bookSchema');
const Author = require('./models/authorSchema');

console.log(`Connecting to MongoDB...`);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Error connecting to MongoDB: ${error.message}`));

const typeDefs = gql`
  type Mutation {
    addBook(title: String, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String!]): [Book!]!
    allAuthors: [Author!]!
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
