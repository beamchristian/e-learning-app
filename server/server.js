const express = require('express');
import cors from 'cors';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();

// create express app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE || 'mongodb://localhost/E-learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('**DB CONNECTED**'))
  .catch(err => console.log('DB CONNECTION ERR => ', err));

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// route
readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

// PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
