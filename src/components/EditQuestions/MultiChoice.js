import React, { Component } from 'react'
import * as actions from '../../actions'
import ArrowsV from 'react-icons/lib/fa/arrows-v'
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'


export default class MultiChoice extends Component {

  onTitleChange = ev => {
    actions.changeQuestion(
      this.props.question.set('title', ev.target.value),
      this.props.selectedIndex
    )
  }

  onChoiceChange = (ev, choice, choiceIndex) => {
    actions.changeChoice(
      this.props.question,
      this.props.selectedIndex,
      choice.set('text', ev.target.value),
      choiceIndex
    )
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
          type="text" value={this.props.question.get('title')}
          placeholder="Enter your question"
          onChange={this.onTitleChange} />
        <div className="entryHeader">Answer Choices</div>
        <div className="choices">
          {this.props.question.get('choices').map((choice, i) => (
            <div className="choice" key={choice.get('id')}>
              <ArrowsV className="arrows" />
              <input type="text" value={choice.get('text')}
                onChange={ev => this.onChoiceChange(ev, choice, i)} />
              <div className="circle plus">
                <Plus />
              </div>
              <div className="circle minus">
                <Minus />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
