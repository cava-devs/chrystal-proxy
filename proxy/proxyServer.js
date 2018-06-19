const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8081;
const proxy = require('express-http-proxy');

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

app.use('/', function(req, res, next) {
  console.log(req.url);
  next();
});

app.use('/overviews', proxy(`http://cavatableoverviews-env.5sves92ky9.us-west-1.elasticbeanstalk.com/`));
app.use('/menus', proxy(`http://cavatablemenus-env.5sves92ky9.us-west-1.elasticbeanstalk.com/`));
app.use('/reservations', proxy(`http://cavareservations.us-west-2.elasticbeanstalk.com/`));
app.use('/photos', proxy(`http://cavatablephotosv3-env.ispdbjpura.us-west-1.elasticbeanstalk.com/`));
app.use('/reviews', proxy(`http://cavatablefec-env.psexkp69kr.us-west-1.elasticbeanstalk.com/`));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});