var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');

var Schema = mongoose.Schema;

var started = false;

var gameSchema = new Schema({
  num_players : Number,
  count: Number,
  game_name: String,
  player_1_id : String,
  player_2_id : String,
  player_3_id : String,
  player_4_id : String,
  game_started: Boolean,
  game_finished: Boolean
});

var playerSchema = new Schema({
  first_name: String,
  last_name: String,
  image: String,
  phone: String,
  email: String,
  counted: Boolean,
  user_name: String
});

var Game = mongoose.model('Game', gameSchema);
var Player = mongoose.model('Player', playerSchema);

module.exports.game = Game;
module.exports.player = Player;
module.exports.started = started;