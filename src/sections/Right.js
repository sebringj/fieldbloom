import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EditQuestions from '../components/EditQuestions'

class Right extends Component {
  render() {

    let selected
    for (let question of this.props.questions) {
      if (question.get('selected')) {
        selected = question
        break
      }
    }

    if (!selected)
      return null

    let QuestionClass = EditQuestions[selected.get('class')]

    return (
      <div className="right">
        <QuestionClass {...selected.toObject()}  />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    questions: state.get('questions').toArray()
  }
}

export default connect(mapStateToProps)(Right)
