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
  app.get('/finalresult', function(req, res){
    //for succesful request:
    helpers.getFinalImageURL(function(pathToImage) {
      res.end(pathToImage);
    }, //for errors
    function(pathToImage) {
      res.end('');
    })

  });

  app.get('/game', function(req, res){
    helpers.createNewGame(res);
  });

  app.get('/game/:gameCode', function(req, res){
    if(!req.session)
    //check for a cookie
    //call isLoggedIn
      // if not logged in:
        //see if there is room in the game (check count)
          //if count not four
            // create a new player
              // update game object with new player + count
              // create the session.  
    req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
    //check if player exists
    //make a session for player
    //enter player into database
  });

  app.post('/game/:username', function(req, res){
    //save the image
    //from the username - make a player - give it the image link and etc.
    //set the player id in the game
    //increasing the count.
    //console.log(req.body);

    //establishing params
    //setting the userkeys based on the username from the client
    var image = req.body.image;
    var userName = req.params.username;
    var userKey = '';
    if(userName === 'player1'){
      userKey = 'player_1_id';
    } else if(userName === 'player2'){
      userKey = 'player_2_id';
    } else if(userName === 'player3'){
      userKey = 'player_3_id';
    } else {
      userKey = 'player_4_id';
    }

    //creates path for the image
    var imagePath = path.join(__dirname, '/../assets/drawings/', userName + '.png');
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
        db.player.findOneAndUpdate({user_name: userName}, {image:imagePath}, {upsert: true, 'new': true}, function (err, player) {
          //if game hasn't started. 
          if(!db.started) {
            helpers.createNewGame(player, userKey, userName, res);

          } else {
            helpers.updateGame(player, userKey, userName, res);
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