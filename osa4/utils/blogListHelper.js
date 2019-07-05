/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const dummy = () => 1;

const totalLikes = blogs => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // zero likes if no blogs supplied
  if (blogs.length === 0) {
    return 0;
  }

  // get an array of just the likes and reduce it
  const blogLikes = blogs.map(blog => blog.likes);
  return blogLikes.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  const reducer = (max, currentValue) => Math.max(max, currentValue);

  const blogLikes = blogs.map(blog => blog.likes);
  const mostLikes = blogLikes.reduce(reducer, 0);

  return blogs.find(blog => blog.likes === mostLikes);
};

const mostBlogs = blogs => {
  const countItems = (array, searchItem, searchTerm) => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    array.map(item => (item[searchItem] === searchTerm ? count++ : null));

    return count;
  };

  const blogAuthors = blogs.map(blog =>
    Object.assign({}, { author: blog.author }),
  );

  let uniqueBlogAuthors = [...new Set(blogAuthors.map(item => item.author))];

  uniqueBlogAuthors = uniqueBlogAuthors.map(author =>
    Object.assign(
      {},
      { author, blogs: countItems(blogAuthors, 'author', author) },
    ),
  );

  return uniqueBlogAuthors;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
