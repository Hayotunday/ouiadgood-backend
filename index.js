import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/users.js'
import notesRoutes from './routes/notes.js'
import moneyRoutes from './routes/money.js'

import Money from './model/money.js'

import { connectToDB } from './connection.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDB();

app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);
app.use('/money', moneyRoutes);

let value = 0.01;
var moneyValue = 0;
var result = {};

if (connectToDB) {
  const newMoney = new Money({ totalmoney: moneyValue++ });

  newMoney.save()
    .then(() => { /* console.log('Money created!') */ })
    .catch((err) => { console.log('Error: ' + err) })

  Money.deleteMany({ no: { $gt: 0 } })
    .then(() => { /* console.log('Money deleted!') */ })
    .catch((err) => { console.log('Error: ' + err) })

  setInterval(async () => {
    await Money.findOneAndUpdate({}, { $inc: { totalmoney: value } })
      .then((res) => {
        result = { ...result, res }
      })
      .catch((error) => {
        console.error('Failed to increase value:', error);
      });
  }, 10000)
}

app.listen(port, () => console.log(`Server running`))
