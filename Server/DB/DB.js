var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');

var Schema = mongoose.Schema

var started = false;
 
var drawingSchema = new Schema({
  numPlayers : Number,
  count: Number,
  player_1_id : String,
  player_2_id : String,
  player_3_id : String,
  player_4_id : String
});

var playerSchema = new Schema({
  firstname: String,
  lastname: String,
  image: String,
  phone: String,
  email: String
})

var Drawing = mongoose.model('Drawing', drawingSchema);
var Player = mongoose.model('Player', playerSchema);

module.exports.drawing = Drawing;
module.exports.player = Player;
module.exports.started = started;