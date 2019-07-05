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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
