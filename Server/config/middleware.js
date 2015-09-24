var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var db = require('../DB/DB.js');
var router = require('../routes.js');



module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations

  //app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // *********Set up our routes to manage calls to our REST API.
  //app.use("/besties", router);


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

};