const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('express-http-proxy');

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

app.use('/', function(req, res, next) {
  console.log(req.url);
  next();
});

app.use('/reviews', proxy(`http://localhost:3002`));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});