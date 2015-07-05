'use strict'; 

var React = require('react')
  , Store = require('./store')

  // components
  , AddTask = require('./components/add-task.jsx')
  , List = require('./components/list.jsx')

module.exports = React.createClass({

  componentDidMount: function () {
    Store.on('change', this._handleStoreChange);
  },

  componentWillUnmount: function () {
    Store.removeListener('change', this._handleStoreChange);
  },

  _handleStoreChange: function () {
    this.forceUpdate();
  },

  render: function () {
    var tasks = Store.getTasks();
    return <section>
      <AddTask />
      <List  tasks={tasks} />
    </section> 
  }
})
