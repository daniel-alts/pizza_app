const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      required: [true, 'Please Provide Your username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide Your password'],
    },
    user_type: {
      type: String,
      required: [true, 'Please Provide Your user type'],
      enum: {
        values: ['admin', 'user'],
        message: 'Please Provide a valid user type',
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model('User', userSchema);
