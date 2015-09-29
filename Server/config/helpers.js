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
    console.log("---------");
    console.log("makeImages was invoked... making images");
    console.log("---------");

    var readStream = fs.createReadStream("Server/assets/drawings/player1.png");
    // using http://aheckmann.github.io/gm/docs.html#append 
      gm(readStream)
      .append("Server/assets/drawings/player2.png", "Server/assets/drawings/player3.png", "Server/assets/drawings/player4.png")
      .stream(function (err, stdout, stderr) {
        console.log("Streaming the image now");
        var writeStream = fs.createWriteStream('client/uploads/game.png');
        stdout.pipe(writeStream);
        // callback();
    });
  },

  getFinalImageURL: function(callback, error) {

    // **NB** this finalImageURL is hard coded right now, but later it should be path_to_images/gameID.png
    var finalImageURL = 'client/uploads/game.png'; 
    // first, check to see if the final image exists. 
    fs.stat(finalImageURL, function(err, res) {
      if (err) {
        error(err);
        console.log("The image", finalImageURL, "doesn't exist!");
      } else {
        // if the image exists, then send the path to the image onward. 
        var fixedFinalImageURL = finalImageURL.slice(6);
        console.log("The final image URL was successfully retrieved from the server. It's", fixedFinalImageURL);
        callback(fixedFinalImageURL);
      }
    })
  },


  //gameid, playerid, url to image
  updatePlayer: function() {

  },

  createUniqueGameCode: function(){
  
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

  },

  createNewGameOld: function(player, userKey, userName, res) {

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
    db.game.update({game_code: code}, newGame, {upsert: true, 'new': true}, function(err, game){
      return res.sendStatus(201);
    });
  },

  createNewGame: function(res){
    var code = this.createUniqueGameCode();
    console.log("the unique code is:" + code);
    var game = new db.game({game_code: code}).save();
    console.log('the game_code is ', game.game_code);
    res.send(code);
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
      db.game.findOneAndUpdate({game_code: "game"}, gameObj, {upsert: true, 'new': true}, function(err, game){
        //if all players have submitted drawings
        if (game.count === game.num_players) {
          console.log("Let's invoke the image stitcher function now");
          // invoke create unified image function 
          module.exports.makeImages(function() {
            if (err) throw err;
            console.log("Done drawing the image, check the image folder!");
          });
        }
      });
    }
    return res.sendStatus(201); 
  }
}