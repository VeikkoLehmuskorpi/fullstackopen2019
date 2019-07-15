const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// GET
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  const usersFormatted = await users.map(user => user.toJSON());

  response.json(usersFormatted);
});

// POST
usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    // abort if no password
    if (body.password === undefined) {
      return response.status(400).json({ error: 'password required' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
