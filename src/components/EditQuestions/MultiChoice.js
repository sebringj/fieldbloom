import React, { Component } from 'react'
import * as actions from '../../actions'
import ReactDOM from 'react-dom'

export default class MultiChoice extends Component {

  onClick = () => {
    actions.selectQuestion(
      this.props,
      ReactDOM.findDOMNode(this).getBoundingClientRect()
    )
  }

  onChange = () => {

  }

  render() {
    return (
      <div className="editQuestion multiChoice">
        <div className="title">
          <div className="q">{'Q'+(this.props.selectedIndex+1)}</div>
          Multi Choice
        </div>
        <input type="text" value={this.props.title} onChange={this.onChange} />
        {this.props.choices.toArray().map(choice => {
          <div className="choices">{choice}</div>
        })}
      </div>
    )
  }
}
