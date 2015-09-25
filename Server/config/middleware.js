var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var db = require('../DB/DB.js');
var router = require('../routes.js');
var path = require('path');
var fs = require('fs');



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
    //console.log(req.body);

    //establishing params
    var image = req.body.image;
    var userName = req.params.username;
    var userKey = '';
    if(userName === 'player1'){
      userKey = 'player_1_ID';
    } else if(userName === 'player2'){
      userKey = 'player_2_ID';
    } else if(userName === 'player3'){
      userKey = 'player_3_ID';
    } else {
      userKey = 'player_4_ID';
    }

    var imagePath = path.join(__dirname, '/../assets/drawings/', userName);

    //First we create the image so we can use it to create the player.
    fs.writeFile(imagePath, image, function(err){
      if(err){
        console.log("There was an error: " + err);
        res.sendStatus(500);
      } else {
        //db.player.update or insert
        db.player.findOneAndUpdate({user_name: userName}, {image:imagePath}, {upsert: true}, function (err, player) {
          if(!db.started) {

            var newGame = {num_players: 4, count: 1};
            newGame[userKey] = player._id;
            console.log(newGame);
            //console.log(resp);
            //todo, figure out how to get the player ID.
            db.game.update({}, newGame, {upsert: true}, function(err, game){
              db.started = true;
              return res.sendStatus(201);
            });
          } else {
            var gameObj = {
              count: count + 1
            };
            gameObj[userKey] = player._id;
            db.game.findOneAndUPdate({}, userObj, {upsert: true}, function(err, game){
              return res.sendStatus(201);
            });
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

  app.get('/game/', function(req, res){
    //if count is 4
    //send back all four images.
    //else....dunno.  Figure it out later.
  });


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};