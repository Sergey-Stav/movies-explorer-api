require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rate-limiter');
const errorProcessing = require('./errors/errorProcessing');
const { devDatabaseUrl } = require('./utils/config');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { DATA_BASE, NODE_ENV } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3006',
    'http://diploma.students.nomorepartiesxyz.ru',
    'https://diploma.students.nomorepartiesxyz.ru',
    'http://62.84.120.221',
    'https://62.84.120.221',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : devDatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(helmet());

app.use(limiter);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorProcessing);

app.listen(PORT);
