'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./items.sql', function (err) {
  if (err) {
    console.log('ERROR OPENING DATABASE', err)
  } else {
    console.log('database opened')
  }
});

module.exports = {
  findAll: function *() {

  },
  findOne: function *() {

  },
  findOneAndUpdate: function *() {

  },
  findAndRemove: function*() {

  },
  insert: function*() {

  }
}