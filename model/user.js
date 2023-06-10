import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!. Enter another email that is unique'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    unique: [true, 'Username already exist!. Enter another username that is unique'],
    require: [true, 'Username is required!'],
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    require: [true, 'Password is required!'],
  },
  admin: {
    type: Boolean,
    require: [true, 'Administrative status required is required!'],
  },
  heart: {
    type: Number,
  },
  totalheart: {
    type: Number,
  },
  referral: {
    type: Boolean,
  },
  numberOfReferred: {
    type: Number,
  },
}, {
  timestamps: true
})

const User = mongoose.models.User || model("User", UserSchema);

export default User