import mongoose, { Schema, model } from "mongoose";

const MoneySchema = new Schema({
  totalmoney: {
    type: Number
  }
}, {
  timestamps: true
})

const Money = mongoose.models.money || model("Money", MoneySchema);

export default Money