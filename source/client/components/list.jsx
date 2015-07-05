'use strict';

var React = require('react')
  , _ = require('lodash')
  , Task = require('./task.jsx')
  , ListGroup = require('react-bootstrap').ListGroup
  , ListGroupItem = require('react-bootstrap').ListGroupItem

module.exports = React.createClass({
  render: function () {
    return <ListGroup fill>
      {!!this.props.tasks.length && _.map(this.props.tasks, function (task) {
        return <ListGroupItem key={task.id}><Task task={task} /></ListGroupItem>
      }) || 
        <ListGroupItem className="text-center no-tasks">no tasks</ListGroupItem>
      }
    </ListGroup>
  }
})
