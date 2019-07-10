const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
/* eslint-enable no-param-reassign */
/* eslint-enable no-underscore-dangle */

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Blog', blogSchema);
