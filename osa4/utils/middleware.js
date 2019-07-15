// Middleware: tokenExtractor
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
    return next();
  }
  return next();
};

// Middleware: unknownEndpoint
const unknownEndpoint = (request, response) => response.status(404).json({ error: 'unknown endpoint' });

// Middleware: errorHandler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }

  return next(error);
};

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
};
