'use strict';

var sqlite3 = require('sqlite3').verbose()
  ,  _ = require('lodash')

// initialize the db
var db = new sqlite3.Database(process.env.TODO_DB_FILE || ':memory:', function (err) {
  if (err) {
    console.log('ERROR OPENING DATABASE', err)
  } else {
    db.run("CREATE TABLE if not exists todo (id INTEGER PRIMARY KEY, task char(100) NOT NULL, status bool NOT NULL)", [])
    console.log('database connection opened')
  }
}); 


module.exports = {
  findAll: function *() {
    return new Promise(function (resolve, reject) {
      db.all('SELECT * FROM todo', function (err, data) {
        if (err) { reject(err) } else {
          resolve(data);
        }
      })
    })
  },
  findOneAndUpdate: function *(data) {
    return new Promise(function (resolve, reject) {
      db.run("UPDATE todo SET task = ?, status = ? WHERE id = ?", [data.task, data.status, data.id], function (err) {
        if (err) { reject(err); } else {
          var id = this.lastID;
          resolve(_.extend({},data,{
            id: id
          }))
        }
      });
    })
  },
  findAndRemove: function*(data) {
    return new Promise(function (resolve, reject) {
      db.run("DELETE FROM todo WHERE id = ?", [data.id], function (err) {
        if (err) { reject(err); } else {
          resolve()
        }
      });
    })
  },
  insert: function*(data) {
    return new Promise(function (resolve, reject) {
      db.run("INSERT INTO todo (task,status) VALUES (?,?)", [data.task, false], function (err) {
        if (err) { reject(err); } else {
          var id = this.lastID;
          resolve(_.extend({},data,{
            id: id
          }))
        }
      });
    })
  }
}