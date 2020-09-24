const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const controllers = require('./controllers');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', controllers.usersController);
app.use('/products', controllers.productsController);

app.get('/', async (_req, res) => res.send('Hello, Trybeer'));

app.use((err, _req, res, _next) => {
  if (err.payload) return res.status(err.status).json(err.payload);
  if (err.message === "Duplicate entry 'user@test.com' for key 'users.email_un'"
  ) return res.status(400).json({ message: 'E-mail already in database.' });
  return res.status(500).json({ message: 'Internal Error' });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Escutando porta nr. ${PORT}`));
