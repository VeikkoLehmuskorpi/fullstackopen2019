const { ApolloServer, gql, UserInputError } = require('apollo-server');
const uuid = require('uuid/v4');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

/*
 * It would be more sensible to assosiate book and the author by saving
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Mutation {
    addBook(title: String, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'world';
    },
    bookCount: () => {
      return books.length;
    },
    authorCount: () => {
      return authors.length;
    },
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books;

      if (args.author && args.genre) {
        return books.filter(book => {
          return book.author === args.author && book.genres.includes(args.genre);
        });
      }

      if (args.author) {
        return books.filter(book => book.author === args.author);
      }

      if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre));
      }
    },
    allAuthors: () => {
      const bookCount = authorName => {
        return books.filter(book => book.author === authorName).length;
      };

      return authors.map(author => {
        return { ...author, bookCount: bookCount(author.name) };
      });
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find(author => author.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }

      if (books.find(book => book.title === args.title)) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        });
      }

      const book = {
        ...args,
        id: uuid(),
      };
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name);
      if (!author) {
        return null;
      }

      const bookCount = authorName => {
        return books.filter(book => book.author === authorName).length;
      };

      const updatedAuthor = {
        ...author,
        name: args.name,
        born: args.setBornTo,
        bookCount: bookCount(args.name),
      };

      console.log(updatedAuthor);

      authors = authors.map(author => {
        return author.name === args.name ? updatedAuthor : author;
      });

      return updatedAuthor;
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
