'use strict';

var React = require('react')
  , commander = require('../commander')
  , Input = require('react-bootstrap').Input
  , Button = require('react-bootstrap').Button

module.exports = React.createClass({
  
  getInitialState: function () {
    return {
      value: '',
      error: false
    }
  },

  handleChange: function () {
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  handleSubmit: function (ev) {
    ev.preventDefault();
    if (this.state.loading) { return; }
    this.setState({
      loading: true
    });
    commander.addTask({
      task: this.state.value
    }).then(function () {
      this.setState({
        value: '',
        error: false,
        loading: false
      });
    }.bind(this)).catch(function (err) {
      this.setState({
        loading: false,
        error: err.message
      });
    }.bind(this))
    ;
  },

  render: function () {
    return <form>
      <Input
        type='text'
        bsSize='medium'
        value={this.state.value}
        placeholder='What do you need to do?'
        ref='input'
        onChange={this.handleChange}
        bsStyle={this.state.error ? 'error' : null}
        help={this.state.error}
        disabled={this.state.loading}
        maxLength={100}
        buttonAfter={
        <Button bsStyle="primary" type="submit" onClick={this.handleSubmit} disabled={this.state.loading} >
          {this.state.loading ? <span>&nbsp;<i className="fa fa-spin fa-circle-o-notch"/>&nbsp;&nbsp;</span> : 'Add'}
        </Button>}
      />
    </form>
  }
})
