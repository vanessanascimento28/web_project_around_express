const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)(www\.)?([\w\-._~:/?#[\]@!$&'()*+,;=]+)#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'O link do avatar é inválido.'
    }
  }
});

module.exports = mongoose.model('user', userSchema);