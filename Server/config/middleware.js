var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var db = require('../DB/DB.js');
var router = require('../routes.js');



module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations

  //app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));  //rename to whatever the client location is.

  // *********Set up our routes to manage calls to our REST API.
  //app.use("/game", router);
  app.get('/game/:username', function(req, res){
    //if no game in DB, make the game.
  });
  app.post('/game/:username', function(req, res){
    //save the image
    //from the username - make a player - give it the image link and etc.
    //set the player id in the game
    //increasing the count.
  });
  app.get('/game/', function(req, res){
    //if count is 4
    //send back all four images.
    //else....dunno.  Figure it out later.
  });


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};