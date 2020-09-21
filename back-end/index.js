const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (_req, res) => res.send('Hello, Trybeer'));

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Escutando porta nr. ${PORT}`));
