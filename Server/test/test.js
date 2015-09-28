var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var supertest = require("supertest");
var helpers = require("../config/helpers.js");
var middleware = require("../config/middleware.js");
// for when we eventually want to test against mock data
var fs = require('fs');
var path = require('path');

describe('helper functions', function() {

  describe('errorLogger', function() {

    it('should be a function', function() {

      helpers.errorLogger.should.be.a('function');

      helpers.errorLogger.should.not.be.a('object');

      expect(helpers.errorLogger.bind(null, error, req, res, next)).to.throw(error.stack);

    });

  });
  describe('errorHandler', function() {

    it('should be a function', function() {

      helpers.errorHandler.should.be.a('function');

      helpers.errorHandler.should.not.be.a('object');

      expect(helpers.errorLogger(res._responseCode).to.equal(500));

    });
  });

  describe('decodeBase64Image', function() {
    describe('the trimTodoName method', function() {
      it('should return a response object', function() {
        expect(helpers.decodeBase64Image.bind(null, "hello").to.be.a('object'));
      })
    })


  })
  // TODO: tests for makeimages and showImage
})
