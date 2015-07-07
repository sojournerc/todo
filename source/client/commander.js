'use strict';

var Store = require('./store')
  , _ = require('lodash')
  , phrases = require('know-your-http-well').statusCodesToPhrases;

var HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

var _2XX = /^2\d\d$/;
var _4XX = /^4\d\d$/;
var _5XX = /^5\d\d$/;

function makeRequest(args, onSuccess) {
  return new Promise(function (resolve, reject) {
    fetch(args.url, {
      method: args.method,
      headers: HEADERS,
      body: args.body
    }).then(function(response) {
      if (_2XX.test(response.status)) {
        if (response.status === 204) { return true; } else {
          return response.json(); }
      } else if (_4XX.test(response.status) || _5XX.test(response.status)) {
        reject({ status: response.status, message: phrases[response.status] })  
      } else {
        reject({ message: 'unknown error' });
      }
    }).then(function (json) {
      resolve(json);
      typeof onSuccess === 'function' && onSuccess(json);
    }).catch(function (ex) {
      console.log(ex)
      reject(ex);
    })
  });
}

var commander = module.exports = {
  addTask: function (item) {
    return makeRequest({
      url: '/api/task',
      method: 'post',
      body: JSON.stringify(item)
    }, commander.fetchTasks)
  },
  updateTask: function (item) {
    return makeRequest({
      url: _.template('/api/task/${ id }')(item),
      method: 'put',
      body: JSON.stringify(item)
    }, commander.fetchTasks)
  },
  removeTask: function (item) {
    return makeRequest({
      url: _.template('/api/task/${ id }')(item),
      method: 'delete',
      body: JSON.stringify(item)
    }, commander.fetchTasks)
  },
  fetchTasks: function () {
    return makeRequest({
      url: '/api/tasks',
      method: 'get'
    }, commander.setTasks);
  },
  setTasks: function (json) {
    Store._setTasks(_.clone(json));
  }
}