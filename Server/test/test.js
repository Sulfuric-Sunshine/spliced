var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var helpers = require("../config/helpers.js")
  // for when we eventually want to test against mock data
var fs = require('fs');
var path = require('path');

describe('helper functions', function() {
    describe('errorLogger', function() {

      it('should be a function', function() {

        helpers.errorLogger.should.be.a('function');

        helpers.errorLogger..should.not.be.a('object');

        expect(helpers.errorLogger.bind(null, error)).to.throw(error.stack);

      });

      describe('errorLogger', function() {

        it('should be a function', function() {

          helpers.errorLogger.should.be.a('function');

          helpers.errorLogger..should.not.be.a('object');

          expect(helpers.errorLogger.bind(null, error)).to.throw(error.stack);

        });

        // it('should have all the necessary methods', function() {

        //   todo.should.have.property('util');

        //   todo.util.trimTodoName.should.be.a('function');

        //   todo.util.isValidTodoName.should.be.a('function');

        //   todo.util.getUniqueId.should.be.a('function');
        //   assert.typeOf(todo.util.isValidTodoName, 'function');

        // });
      });
    });

    describe('the todo.util methods', function() {
      describe('the trimTodoName method', function() {
        it('should trim whitespace off provided names', function() {
          expect(todo.util.trimTodoName("name  ")).to.equal("name");
          expect(todo.util.trimTodoName("names ")).to.have.length(5);
        })
      })

      describe('the isValidTodoName method', function() {
        it('should validate names provided', function() {
          expect(todo.util.isValidTodoName("  ")).to.equal(false);
          expect(todo.util.isValidTodoName("e")).to.not.equal(true);
          assert.ok(todo.util.isValidTodoName("Fareez"));
        })
      })

      describe('the getUniqueId method', function() {
        it('should increment ids', function() {
          expect(todo.util.getUniqueId()).to.equal(1);
        })
      })
    })
