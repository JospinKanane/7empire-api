const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const port = 2023;
const router = require('./routes/router')
const mongoose = require('mongoose');
const cors = require('cors')

require("dotenv").config();

mongoose.connect( process.env.MONGODB_URI, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB 7-Empire db réussie !'))
  .catch(() => console.log('Connexion à MongoDB 7-Empire db échouée !'));
  
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

app.listen(port, () => console.log(`server listening on ${port}`));
