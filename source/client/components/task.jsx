'use strict';

var React = require('react')
  , _ = require('lodash') 
  , Input = require('react-bootstrap').Input
  , Button = require('react-bootstrap').Button
  , commander = require('../commander')

module.exports = React.createClass({

  getInitialState: function () {
    return {
      editing: false,
      value: this.props.task.task,
      status: this.props.task.status
    }
  },

  onEdit: function (ev) {
    ev.preventDefault()
    this.setState({editing: true})
  },

  onCancel: function (ev) {
    ev.preventDefault()
    this.setState({editing: false})
  },

  onRemove: function (ev) {
    ev.preventDefault()
    commander.removeTask(this.props.task)
  },

  handleValueChange: function () {
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  handleStatusToggle: function () {
    this.setState({
      status: !this.state.status
    }, this._persistChange);
  },

  handleUpdate: function (ev) {
    ev.preventDefault();
    this._persistChange();
  },

  _persistChange: function () {
    if (this.state.loading) { return; }
    this.setState({
      loading: true
    });
    commander.updateTask(_.extend({},this.props.task,{
        task: this.state.value,
        status: this.state.status
      })).then(function (data) {
      this.setState({
        value: data.task,
        error: false,
        loading: false,
        editing: false
      });
    }.bind(this)).catch(function (err) {
      this.setState({
        loading: false,
        error: err.message
      });
    }.bind(this));
  },

  render: function () {
    return <div className={'task '+ (this.state.status ? 'complete' : '')}>
      <Input 
        type='checkbox' 
        checked={this.state.status}
        onChange={this.handleStatusToggle}
        disabled={this.state.editing}
      />
      {this.state.editing && 
      <form>
        <Input
          type='text'
          bsSize='small'
          value={this.state.value}
          ref='input'
          onChange={this.handleValueChange}
          bsStyle={this.state.error ? 'error' : null}
          help={this.state.error}
          disabled={this.state.loading}
          maxLength={100}
          buttonAfter={
          <Button bsStyle="primary" type="submit" onClick={this.handleUpdate} disabled={this.state.loading} >
            {this.state.loading ? <span>&nbsp;<i className="fa fa-spin fa-circle-o-notch"/>&nbsp;&nbsp;</span> : 'Update'}
          </Button>}
        />
      </form>
      ||
      <span onClick={this.onEdit}>{this.props.task.task}</span>}
      <span className="task-controls">
        {this.state.editing &&
        <a href="#" onClick={this.onCancel}><i className="fa fa-close"/></a>
        ||
        <span>
          <a href="#" onClick={this.onEdit}><i className="fa fa-pencil"/></a>
          &nbsp;&nbsp;
          <a href="#" onClick={this.onRemove}><i className="fa fa-trash"/></a>
        </span>}
      </span>
    </div>
  }
})
