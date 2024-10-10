const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('../models');
const authRouter = require('./routes/auth-route');
const translateRouter = require('./routes/translate-route');
const summaryRouter = require('./routes/summary-route');
dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(morgan('combined'));
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
} else {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
  .sync()
  .then(() => {
    console.log('DB has connected!');
  })
  .catch((err) => console.error(err));

app.use('/auth', authRouter);
app.use('/translate', translateRouter);
app.use('/summarize', summaryRouter);

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}/`);
});
