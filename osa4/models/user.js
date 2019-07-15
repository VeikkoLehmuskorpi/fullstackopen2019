const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    require: true,
  },
  name: String,
  passwordHash: String,
});

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
/* eslint-enable no-param-reassign */
/* eslint-enable no-underscore-dangle */

userSchema.plugin(uniqueValidator);

mongoose.set('useCreateIndex', true);

module.exports = mongoose.model('User', userSchema);
