const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Blog', blogSchema);
