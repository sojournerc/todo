'use strict';

var taskProvider = require('../providers/task-provider');

module.exports = function*() {
  var tasks = yield taskProvider.findAll()
  yield this.render('home', { 
    title: 'My Todo List',
    tasks: tasks,
    development: process.env.NODE_ENV === 'development'
  });
}