import mongoose, { Schema, model } from "mongoose";

const NoteSchema = new Schema({
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

const Note = mongoose.models.Note || model("Note", NoteSchema);

export default Note