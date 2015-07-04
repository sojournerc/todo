'use strict'

var koa = require('koa')
  , logger = require('koa-logger')
  , serve = require('koa-static')
  , mount = require('koa-mount')
  , router = require('koa-router')()
  , hbs  = require('koa-hbs')

  , errors = require('./source/server/errors')
  , api = require('./source/server/api')
  , index = require('./source/server/index')

var app = module.exports = koa();

app.use(logger());
app.use(errors());

// templating
hbs.registerHelper('json', function(obj){
  var result = JSON.stringify(obj);
  return result;
});
app.use(hbs.middleware({
    extname:".hbs",
    defaultLayout: 'index',
    layoutsPath: __dirname + '/source/views',
    viewPath: __dirname + '/source/views'
}));

// serve static assets
app.use(serve(__dirname + '/public'));
// mount api
app.use(mount('/api', api));

// serve index
router.get('/', index);
app.use(router.routes());

var port = process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 5000;
var ip = process.env.OPENSHIFT_NODEJS_IP;

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

app.listen(port, ip)