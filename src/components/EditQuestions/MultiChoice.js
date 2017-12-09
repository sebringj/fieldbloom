import React, { Component } from 'react'
import * as actions from '../../actions'
export default class MultiChoice extends Component {

  onClick = () => {
    actions.selectQuestion(this.props)
  }

  render() {
    return (
      <div className="editQuestion multiChoice">
        <input type="text" value={this.props.title}  />
        {this.props.choices.toArray().map(choice => {
          <div className="chioces">{choice}</div>
        })}
      </div>
    )
  }
}
