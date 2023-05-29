import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    require: [true, 'Username is required!'],
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    require: [true, 'Password is required!'],
  },
  heart: {
    type: Number,
  },
  bookmarks: {
    type: Array,
  },
}, {
  timestamps: true
})

const User = mongoose.models.User || model("User", UserSchema);

export default User