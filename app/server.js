'use strict';
require('dotenv').config();
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

console.log( process.env );
// App
const app = express();
app.get('/', (req, res) => {
  var message = `<p>Build Number: ${process.env.BUILD}<br><a href='http://20.169.220.3:8080/'>Jenkins Server<a/><br>Prod url:<br>QA url:<br>`
  res.status(200).send(message);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});