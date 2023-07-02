import mongoose, { Schema, model } from "mongoose";

const CharitySchema = new Schema({
  name: {
    type: String,
    require: [true, 'name is required!'],
    minlength: 3,
  },
  about: {
    type: String,
    require: [true, 'text is required!'],
    trim: true,
    minlength: 3,
  },
  heart: {
    type: Number,
  },
  url: {
    type: String,
  },
  image: {
    type: String
  }
}, {
  timestamps: true
})

const Charity = mongoose.models.Charity || model("Charity", CharitySchema);

export default Charity