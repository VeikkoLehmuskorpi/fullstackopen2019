const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  /*   friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  ], */
});

module.exports = mongoose.model('User', userSchema);
