const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');

console.log(`Connecting to ${config.DB_URI} ...`);

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`error connecting to MongoDB: ${error.message}`));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
