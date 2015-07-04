'use strict';

var React = require('react');
var MainController = React.createFactory(require('./main-controller.jsx'));

// get bootstrap data
var bootstrap = document.querySelector('#bootstrap');

var el = document.querySelector('#content');
React.render(MainController(bootstrap), el);
