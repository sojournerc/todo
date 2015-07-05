'use strict';

var taskProvider = require('../providers/task-provider');

module.exports = function*() {
  var tasks = yield taskProvider.findAll()
  console.log(tasks);
  yield this.render('home', { 
    title: 'My Todo List',
    tasks: tasks
  });
}