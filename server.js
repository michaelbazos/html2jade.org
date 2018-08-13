// server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
app.use(serveStatic(__dirname + "/dist"));

app.get('/.well-known/acme-challenge/:content', function (req, res) {
  res.send('KJawxyldkWZdn3YtWAGpGYQ57P7auPsGzP0KmcFPBYA.L_dMvm8bs1QNp3eDdnHpiwAej6b62FmtHafUtRKFhvg')
})

const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);