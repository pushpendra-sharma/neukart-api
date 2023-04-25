const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes');
const cookieParser = require('cookie-parser');
const myReqLogger = require('./utilities/logger');
const errorLogger = require('./utilities/errorLogger');

dotenv.config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB '))
  .catch(err => console.log('Cannot connect to DB ', err));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(myReqLogger);

app.use('/', indexRouter);

app.use(errorLogger);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
