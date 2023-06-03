import mongoose, { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Email is required!'],
  },
  title: {
    type: String,
  },
  body: {
    type: String,
    require: [true, 'text is required!'],
    trim: true,
    minlength: 3,
  }
}, {
  timestamps: true
})

const Todo = mongoose.models.Todo || model("Todo", TodoSchema);

export default Todo