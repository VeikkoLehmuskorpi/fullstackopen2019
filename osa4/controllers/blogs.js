const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// GET
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    const formattedBlogs = await blogs.map(blog => blog.toJSON());
    response.json(formattedBlogs);
  } catch (error) {
    console.error(error);
  }
});

// POST
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!request.body.title && !request.body.url) {
    response
      .status(400)
      .send({ error: 'Title and url missing' })
      .close();
  }

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
});

// DELETE
blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

// PUT
blogsRouter.put('/:id', async (request, response) => {
  // get the request data
  const { body } = request;

  // create a new blog with the request data
  const blog = {
    likes: body.likes,
  };

  // get the blog id
  const { id } = request.params;

  // update specific blog with the new data
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    response.json(updatedBlog);
  } catch (error) {
    console.error(error);
  }
});

module.exports = blogsRouter;
