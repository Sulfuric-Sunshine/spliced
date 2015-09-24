var models = require('./models');
var express = require('express');
var db = require('../DB/DB.js');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

var app = express();

app.use(parser.json()); // for parsing application/json
app.use(parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


module.exports = {
  // messages: {
  //   get: function (req, res) {
  //     models.messages.get(userID, bestieID, res);
  //   }, // a function which handles a get request for all messages
  //   post: function (req, res) {
  //   } // a function which handles posting a message to the database
  // },

};


