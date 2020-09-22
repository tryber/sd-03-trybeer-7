const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const controllers = require('./controllers');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', controllers.userController);

app.get('/', async (_req, res) => res.send('Hello, Trybeer'));

app.use((err, _req, res, _next) =>
  err.payload
    ? res.status(err.status).json(err.payload)
    : res.status(500).json({ message: 'Internal error' }),
);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Escutando porta nr. ${PORT}`));
