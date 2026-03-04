require('dotenv').config();
const API_PORT = process.env.API_PORT || 3000;
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/users'));



app.listen(API_PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${API_PORT}`);
});