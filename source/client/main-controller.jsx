'use strict'; 

var React = require('react')
  , Store = require('./store')

  // components
  , AddItem = require('./components/add-item.jsx')
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
    return <section>
      <h1>TODO:</h1>
      <AddItem 

      />
      <List 

      />
    </section> 
  }
})
