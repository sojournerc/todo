'use strict';

var React = require('react')
  , _ = require('lodash')
  , commander = require('./commander')
  , MainController = React.createFactory(require('./main-controller.jsx'));

// global fetch;
require('whatwg-fetch');

// es6 promise polyfill
require('es6-promise').polyfill()

// get bootstrap data
var bootstrap = {}
var bootstrapEl = document.querySelector('#bootstrap')
_.each(bootstrapEl.childNodes, function (child) {
  var path = child.getAttribute('data-path');
  if (path) {
    try {
      bootstrap[path] = JSON.parse(child.getAttribute('data-json'));
    } catch (err) {}
  }
});
bootstrapEl.parentElement.removeChild(bootstrapEl);
commander.setTasks(bootstrap.tasks);

var el = document.querySelector('#content');
React.render(MainController(bootstrap), el);
