const usersRouter = require('express').Router();
// const User = require('../models/user');

// GET
usersRouter.get('/', async (request, response) => {
  response.send('todo list users here');
});

module.exports = usersRouter;
