var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var db = require('../DB/DB.js');
var router = require('../routes.js');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
var session = require('express-session')


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
  
  // This gets the final image on the /game page. 
  // **NB** Later on we will replace '/game' with the actual game id. 
  // app.get('/finalresult', function(req, res){
  //   //for succesful request:
  //   helpers.getFinalImageURL(function(pathToImage) {
  //     res.end(pathToImage);
  //   }, //for errors
  //   function(pathToImage) {
  //     res.end('');
  //   })

  // });

  app.get('/game', function(req, res){
    helpers.createNewGame(res);
  });

  app.get('/game/:gameCode', function(req, res){

    var code = req.params.gameCode;

    helpers.checkFinalImage(code, function() {}, function() {
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
            console.log("Game count is:", game.count, "For a game of:", game.num_players, "players");

            // check to see if the game is not full
            if(game.count < game.num_players){
              // create a new player (because this player, as you recall, does not have a session yet)
              helpers.createPlayer(req, res, game, code); 
            } else {
              // the game is full.
              // if the game is COMPLETED (that means that the final image has been drawn on the server),
              helpers.resolveFinishedGame(game);
            }
          }
        });
      // if the user already has a session   
      } else {

      }
      //check if player exists
      //make a session for player
      //enter player into database
    })
  });

  app.post('/game/:gameCode', function(req, res){
    var image = req.body.image;
    var cookieData = req.body.cookieData;
    var player = req.body.cookieData.player.j;
    console.log("inside our post handler, the cookie data is", cookieData);
    console.log("inside our post handler, the player is", player);
    var gameCode = req.params.gameCode;
    // get the player object out of the cookie 

    var imagePath = path.join(__dirname, '/../assets/drawings/', gameCode + username +'.png');
    var imageBuffer = helpers.decodeBase64Image(image);
    //First we create the image so we can use it to create the player.
    // image is created as a base 64 string

    //writes image to a file. we don't actually need to do this in a callback
    fs.writeFile(imagePath, imageBuffer.data, function(err){
      if(err){
        console.log("There was an error: " + err);
        res.sendStatus(500);
      } else {
        //db.player.update or insert
        //this finds the user document in the db and either creates it or updates it (if it already exists).
        db.player.findOneAndUpdate({user_name: username}, {image:imagePath}, {upsert: true, 'new': true}, function (err, player) {
          //if game hasn't started. 
          if(!db.started) {
            helpers.createNewGame(player, userKey, username, res);

          } else {
            helpers.updateGame(player, userKey, username, res);
          }
        });
        console.log("File write success");
      }
    });


    // if (!db.started) {
    //   var drawing = new db.drawing();
    //   db.started = true;
    // }
    // if (db.drawing.find( { username: username },function (err, drawing) {
    //   if (err) res.send(500);
    //   var player = new db.player();

    // }))

    // var player = new db.player({  });

  });



  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};