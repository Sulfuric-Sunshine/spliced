var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var db = require('../DB/DB.js');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
var session = require('express-session');


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations

  //app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));  //rename to whatever the client location is.

  // *********Set up our routes to manage calls to our REST API.

  app.use(session({
    secret: 'shhh, it\'s a secret',
    resave: false,
    saveUninitialized: true
    }));

  app.get('/game', function(req, res){
    helpers.createNewGame(res);
  });

  app.get('/game/:gameCode', function(req, res){

    var code = req.params.gameCode;

    //TODO: fill out this empty function!
    helpers.checkFinalImage(code, function(image) {res.send(image);}, function() {
      // invoke check final image before anything else ... and if the image doesn't exist, then do all the stuff in the error callback 
      // if the user does not already have a session
      if(!helpers.hasSession(req)){

        // grab the game code from the req parameters

        // query the database for the game using the game code
        db.game.findOne({game_code: code}, function(err, game){

          // if the game doesn't exist, 404.
          if(!game){
            console.log("No game was found for code: ", code);
            res.sendStatus(404);
          // if the game DOES exist
          } else {
            console.log("Game player count is:", game.player_count, "For a game of:", game.num_players, "players");

            // check to see if the game is not full
            if(game.player_count < game.num_players){
              // create a new player (because this player, as you recall, does not have a session yet)
              helpers.createPlayer(req, res, game, code); 
            } else if(game.submission_count === game.num_players){
              // the game is full.
              // if the game is COMPLETED (that means that the final image has been drawn on the server),
              helpers.resolveFinishedGame(game);
            } //TODO: Make something here that will tell people the game is in progress.
          }
        });
      // if the user already has a session
      } else {

      }
      //check if player exists
      //make a session for player
      //enter player into database
    });
  });

  //submits a game image and handles the logic for drawing the final image.
  app.post('/game/:gameCode', function(req, res){
    var image = req.body.image;
    var cookieData = req.body.cookieData;
    console.log("inside our post handler, the cookie data is", cookieData);
    var gameCode = req.params.gameCode;
    console.log("The game's player ID: ", cookieData[gameCode+"_playerName"]);
    var username = cookieData[gameCode+"_playerName"];

    //Generate the image URL with the name taken from the cookie propeties.
    var imagePath = path.join(__dirname, '/../assets/drawings/', gameCode + username +'.png');
    var imageBuffer = helpers.decodeBase64Image(image);
    //First we create the image so we can use it to create the player.
    // image is created as a base 64 string

    //writes image to a file.
    fs.writeFile(imagePath, imageBuffer.data, function(err){
      if(err){
        console.log("There was an error: " + err);
        res.sendStatus(500);
      } else {
        //db.player.update or insert
        //this finds the user document in the db and either creates it or updates it (if it already exists).
        db.player.findOneAndUpdate({game_code: gameCode, user_name: username}, {image:imagePath}, {upsert: true, 'new': true}, function (err, player) {
          console.log("Player updated with Image URL, calling helpers.updateGame");
          //This function updates the game with the new player data.
          helpers.updateGame(player, gameCode, res);
        });
        console.log("File write success");
      }
    });
  });



  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};