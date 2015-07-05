'use strict';

var koa = require('koa')
  , router = require('koa-router')()
  , taskProvider = require('../providers/task-provider.js')
  , parse = require('co-body')

var app = module.exports = koa()
var TYPE = 'application/json; charset=utf-8';

router.get('/tasks', function*() {
  var tasks = yield taskProvider.findAll()
  this.status = 200;
  this.body = tasks;
  this.type = TYPE;
});
router.post('/task', function*() {
  var data = yield parse(this);
  var persisted = yield taskProvider.insert(data)
  this.status = 201;
  this.body = persisted;
  this.type = TYPE;
});
router.put('/task/*', function*() {
  var data = yield parse(this);
  var persisted = yield taskProvider.findOneAndUpdate(data);
  this.status = 201;
  this.body = persisted;
  this.type = TYPE;
});
router.del('/task/*', function*() {
  var data = yield parse(this);
  yield taskProvider.findAndRemove(data);
  this.status = 204;
  this.type = TYPE;
});

app.use(router.routes());
