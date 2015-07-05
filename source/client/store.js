'use strict';

var _ = require('lodash')
  , EventEmitter = require('events').EventEmitter
  , CHANGE_EVENT = 'change'
  , _store = {}

var Store = _.extend({}, EventEmitter.prototype, {
  getTasks: function () {
    return _store.tasks || [];
  },
  _setTasks: function (tasks) {
    _store.tasks = tasks;
    this._emitChange(); 
  },
  _emitChange: function () {
    this.emit(CHANGE_EVENT);
  }
});

module.exports = Store
