var fs = require('fs');
var gm = require('gm');

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
        var writeStream = fs.createWriteStream('Server/assets/images/final.png');
        stdout.pipe(writeStream);
        // callback();
    });
  }

};