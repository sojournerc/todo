'use strict';

var koa = require('koa')
  , router = require('koa-router')()
  , itemProvider = require('../providers/item.js')
  , parse = require('co-body')

var app = module.exports = koa()

// user
router.get('/items', function*() {
  var data = yield parse(this);
  yield itemProvider.findAndUpdate({_id: this.params[0]}, data);
});
router.post('/item', function*() {
  var data = yield parse(this);
  yield itemProvider.findAndUpdate({_id: this.params[0]}, data);
});
router.put('/item/*', function*() {
  var data = yield parse(this);
  yield itemProvider.findAndUpdate({_id: this.params[0]}, data);
});
router.del('/item/*', function*() {
  var data = yield parse(this);
  yield itemProvider.findAndUpdate({_id: this.params[0]}, data);
});

app.use(router.routes());
