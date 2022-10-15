const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String, 
    unique: [true, 'username exists!'],
    required: [true, 'username is required!'] 
  },

  password: {
    type: String,
    required: [true, 'password is required!']
  },

  user_type: {
    type: String,
    required: [true, 'user_type is required!'],
    enum: {
        values: ['user', 'admin'],
        message: '`{VALUE}` not allowed. User Type Must Be `user` or `admin`'
    }
    
  }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.pre('save', async function(next) {

    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }

    
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
