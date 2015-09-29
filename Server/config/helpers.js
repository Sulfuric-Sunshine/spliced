var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var db = require('../DB/DB.js');

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js

    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  },

  decodeBase64Image: function(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    console.log("response.type is", response.type);
    response.data = new Buffer(matches[2], 'base64');

    return response;
  },

  makeImages: function() {
    var readStream = fs.createReadStream("Server/assets/drawings/player1.png");
    // using http://aheckmann.github.io/gm/docs.html#append 
      gm(readStream)
      .append("Server/assets/drawings/player2.png", "Server/assets/drawings/player3.png", "Server/assets/drawings/player4.png")
      .stream(function (err, stdout, stderr) {
        console.log("Streaming the image now");
        var writeStream = fs.createWriteStream('Server/assets/images/final.png');
        stdout.pipe(writeStream);
        // callback();
    });
  },

  showImage: function(callback) {

    // first, check to see if the final image exists. 
    fs.stat('Server/assets/images/final.png', function(err, res) {
      if (err) {
        console.log("there was an error", err);
        callback(err);
      }

      // if the image exists, then read the file and send it back to the user inside callback function. 
      console.log('file exists');
      fs.readFile('Server/assets/images/final.png', function(err, data) {
        if (err) console.log(err);
        callback(data);
      });
    });
  },

  //gameid, playerid, url to image
  updatePlayer: function() {

  },

  createNewGame: function(player, userKey, userName, res) {
    var newGame = {num_players: 4, count: 1};
    newGame[userKey] = player.id;
    //need to change to update in the db.
    db.started = true;
    // console.log("game is started: " + db.started);
    //update the counted to true - prevents counting a player twice.
    db.player.findOneAndUpdate({user_name: userName}, {counted: true}, {upsert: true, 'new': true}, function (err, player) {
      console.log("Player counted updated.");
    });
    //puts the new game into the database
    db.game.update({game_name: "game"}, newGame, {upsert: true, 'new': true}, function(err, game){
      return res.sendStatus(201);
    });
  },

  //update a game if it already exists
  updateGame: function(player, userKey, userName, res) {
    //create a new game object
    var gameObj = {};
    gameObj[userKey] = player.id;
    //if the player has never submitted a drawing...
    if(!player.counted){
      //increment number of submitted drawings
      gameObj.$inc = {'count':1};
      //update the player to know they have been counted
      db.player.findOneAndUpdate({user_name: userName}, {counted: true, 'new': true}, {upsert: true}, function (err, player) {
        console.log("Player counted updated.");
      });
      //update the game with the new player information
      db.game.findOneAndUpdate({game_name: "game"}, gameObj, {upsert: true, 'new': true}, function(err, game){
        //if all players have submitted drawings
        if (game.count === game.num_players) {
          console.log("Let's invoke the image stitcher function now");
          // invoke create unified image function 
          this.makeImages(function() {
            if (err) throw err;
            console.log("Done drawing the image, check the image folder!");
          });
        }
      });
    }
    return res.sendStatus(201); 
  }

};