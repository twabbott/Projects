////////////////////////////////////////
//   a p p . j s

// Initialize Express
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

// Initialize the API
var api = require('./apiRoutes');
api.init(app);

// Start up Node.
app.listen(8192, function() {
  console.log("StudentRegistrationApi app listening on port 8192.");
});

