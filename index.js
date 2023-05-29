import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';

import usersRoutes from './routes/users.js'
import notesRoutes from './routes/notes.js'

import Money from './model/money.js'

import { connectToDB } from './connection.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDB();

app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);

const newMoney = new Money({ totalmoney: 0 });

newMoney.save()
  .then(() => { console.log('Money created!') })
  .catch((err) => { console.log('Error: ' + err) })

let value = 0.1;

if (connectToDB) {
  setInterval(async () => {
    await Money.findOneAndUpdate({}, { $inc: { totalmoney: value } })
      .then((result) => {
        console.log('Value increased:', result);
      })
      .catch((error) => {
        console.error('Failed to increase value:', error);
      });
  }, 10000)
}

app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`))
