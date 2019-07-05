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

module.exports = {
  dummy,
  totalLikes,
};
