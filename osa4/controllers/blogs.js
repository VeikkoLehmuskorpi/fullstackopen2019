const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

// GET
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    const formattedBlogs = await blogs.map(blog => blog.toJSON());
    response.json(formattedBlogs);
  } catch (error) {
    console.error(error);
  }
});

// POST
blogsRouter.post('/', async (request, response, next) => {
  const { body, token } = request;

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // Create a new blog from the request
    const blog = new Blog(body);

    // Find the correct user by the token id
    const user = await User.findById(decodedToken.id);

    // Append the correct user to the blog object
    // eslint-disable-next-line no-underscore-dangle
    blog.user = user._id;

    // Populate user object
    blog.populate('user', { username: 1, name: 1 });

    if (!body.title && !body.url) {
      return response
        .status(400)
        .send({ error: 'Title and url missing' })
        .close();
    }

    const savedBlog = await blog.save();
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return response.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});

// DELETE
blogsRouter.delete('/:id', async (request, response, next) => {
  const { token } = request;
  const { id } = request.params;

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const blog = await Blog.findById(id);

    // authorized user, delete post
    if (decodedToken.id === blog.user.toString()) {
      await Blog.findByIdAndDelete(id);
      response.status(204).end();
    }
  } catch (error) {
    next(error);
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
