'use strict';

module.exports = function*() {
  yield this.render('home', { title: 'My Todo List' });
}