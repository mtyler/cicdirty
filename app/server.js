'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World\n\n' /
           'This is build number: ' + process.env.BUILD + '\n\n' /
           'Jenkins server: http://20.169.220.3:8080/\n\n' /
           '  Prod url:\n\n' /
           '    QA url:\n\n');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});