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
  var message = `<p>BBW Proof of Concept<p><p>Dashboard Version: ${process.env.BUILD}<br> \
                 <br>Jenkins Server: <a href='http://20.169.220.3:8080/blue/organizations/jenkins/bbw-azure-poc/branches'>http://20.169.220.3:8080/<a/><br> \
                 <br>QA Service:<br>IP: <a href='http://${process.env.QA}'>${process.env.QA}<a/><br> \
                 <br>Build: <a href='http://${process.env.QA}/healthz'>/healthz<a/><br> \
                 <br>Production Service:<br>IP:<a href='http://${process.env.PROD}'>${process.env.PROD}<a/><br> \
                 <br>Build: <a href='http://${process.env.QA}/healthz'>/healthz<a/><br>`
  res.status(200).send(message);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});