var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');

var Schema = mongoose.Schema
 
var Drawing = new Schema({
  numPlayers : Number,
  count: Number,
  player_1_id : String,
  player_2_id : String,
  player_3_id : String,
  player_4_id : String
});

var Player = new Schema({
  firstname: String,
  lastname: String,
  image: String,
  phone: String,
  email: String
})