const blogListHelper = require('../utils/blogListHelper');

test('dummy returns one', () => {
  const blogs = [];

  const result = blogListHelper.dummy(blogs);
  expect(result).toBe(1);
});
