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

// Configure Express Validator
app.use(expressValidator());

app.get('/', function(request, response) {
  response.render('form');
});

app.post('/', function(request, response) {
  var schema = {
    'name': {
      notEmpty: true,
      isLength: {
        options: [{ max: 100 }],
        errorMessage: 'Name must not be longer than 100 characters'
      },
      errorMessage: 'Invalid Name'
    },
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid Email'
      },
      isLength: {
        options: [{ max: 100 }],
        errorMessage: 'Email must not be longer than 100 characters'
      }
    },
    'birthyear': {
      optional: true,
      isInt: {
        options: { gt: 1899, lt: 2018 }
      },
      errorMessage: 'Invalid Date'
    },
    'position': {
      notEmpty: true,
      matches: {
        options: [/\b(?:manager|developer|ui-designer|graphic-designer)\b/]
      },
      errorMessage: 'Invalid Position'
    },
    'password': {
      notEmpty: true,
      isLength: {
        options: [{ min: 8 }]
      },
      errorMessage: 'Invalid Password'
    }
  };
  request.assert(schema);
  request.getValidationResult().then(function(results) {
    if (results.isEmpty()) {
      response.render('answers', { answers: request.body });
    } else {
      response.render('form', { errors: results.array() });
    }
  });
});

app.listen(3000, function() {
  console.log('Server started');
});