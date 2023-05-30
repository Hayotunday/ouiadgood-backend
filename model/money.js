import mongoose, { Schema, model } from "mongoose";

const MoneySchema = new Schema({
  totalmoney: {
    type: Number
  },
  no: {
    type: Number,
    unique: true
  }
}, {
  timestamps: true
})

const Money = mongoose.models.money || model("Money", MoneySchema);

export default Money