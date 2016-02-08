var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var port = process.env.PORT || 3000;

var morgan = require("morgan");


var bodyParser = require('body-parser');

function requireHTTPS(req, res, next) {
  //
  // The 'x-forwarded-proto' check is for Heroku
  //
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
};

app.use(requireHTTPS);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(express.static('views'));

app.set('view engine', 'ejs');  

require('./routes/routes')(app);

http.listen(port, function(){
    console.log('Server up and running!');
});