'use strict';

var phrases = require('know-your-http-well').statusCodesToPhrases;
module.exports = function(){
  return function*(next){
    try {
      yield next;
    } catch (err) {
      this.status = err.status 
      || 500;
      var data = {
        code: this.status,
        error: phrases[this.status] + '\n\n' + err
      };
      
      // only emit server errors
      if (!/^4\d\d$/.test(this.status)){
        this.app.emit('error', err, this);
      }

      yield this.render('error', data);
    }
  }
};