const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'username to be unique'],
    required: [true, 'username is required'],
    minlength: [3, 'username is too short']
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'password is required']
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
