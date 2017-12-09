import React, { Component } from 'react'
import * as actions from '../../actions'

export default class MultiChoice extends Component {

  onChange = () => {

  }

  render() {
    return (
      <div className="editQuestion multiChoice">
        <div className="title">
          <div className="q">{'Q'+(this.props.selectedIndex+1)}</div>
          Multi Choice
        </div>
        <div className="entryHeader">Question</div>
        <textarea
          type="text" value={this.props.title}
          placeholder={this.props.placeholder}
          onChange={this.onChange} />
        <div className="entryHeader">Answer Choices</div>
        <div className="choices">
          {this.props.choices.toArray().map(choice => {
            <div className="choices">{choice}</div>
          })}
        </div>
      </div>
    )
  }
}
