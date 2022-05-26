require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const badPathHandler = require('./middlewares/badPathHandler');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const connectDB = require('./middlewares/connectDB');

const { NODE_ENV, PORT } = process.env;

const app = express();
/* 100 запросов с одного IP за 15 минут */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(bodyParser.json());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(badPathHandler);
app.use(errorHandler);

connectDB();

app.listen(NODE_ENV === 'production' ? PORT : 3000);
