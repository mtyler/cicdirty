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
  var message = `<p>Build Number/Tag: ${process.env.BUILD}<br><br><a href='http://20.169.220.3:8080/'>Jenkins Server<a/><br><br>QA Service: <a href='${process.env.QA}'>${process.env.QA}<a/><br><br>Production Service: <a href='${process.env.PROD}'>${process.env.PROD}<a/><br>`
  res.status(200).send(message);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});