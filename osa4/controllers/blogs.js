const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => blogs.map(blog => blog.toJSON()))
    .then(formattedBlogs => response.json(formattedBlogs))
    .catch(error => console.error(error));
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (!request.body.title && !request.body.url) {
    response.status(400).send({ error: 'Title and url missing' });
  }

  blog
    .save()
    .then(result => response.status(201).json(result))
    .catch(error => console.error(error));
});

module.exports = blogsRouter;
