/*******************************************************************************
 * @copyright (c) Wayin, Inc. All Rights Reserved.
 ******************************************************************************/
'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {};

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
