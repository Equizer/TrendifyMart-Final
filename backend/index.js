const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors')

connectToMongo();
const app = express();

const port = 5000;

app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.listen(port, () => {
  console.log(`TrendifyMart backend listening at http://localhost:${port}`);
});