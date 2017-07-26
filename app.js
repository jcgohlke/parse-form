const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var app = express();

// Configure mustache with Express
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Allows public folder to be served statically to browsers
app.use(express.static('public'));

// Configure Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
  response.render('form');
});

app.post('/', function(request, response) {
  response.render('answers', { answers: request.body });
});

app.listen(3000, function() {
  console.log('Server started');
});