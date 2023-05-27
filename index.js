import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';


import usersRoutes from './routes/users.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${port}`))