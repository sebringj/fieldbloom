import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EditQuestions from '../components/EditQuestions'

class Right extends Component {

  componentWillReceiveProps(nextProps) {
    //if (nextProps.selectedIndex !== this.props.selectedIndex)
  }

  render() {

    if (this.props.selectedIndex === -1)
      return null

    const selected = this.props.questions.get(this.props.selectedIndex)

    if (!selected)
      return null

    let QuestionClass = EditQuestions[selected.get('class')]

    return (
      <div className="right">
        <QuestionClass {...selected.toObject()} {...this.props}  />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedBoundingClientRect: state.get('selectedBoundingClientRect'),
    selectedIndex: state.get('selectedIndex'),
    questions: state.get('questions')
  }
}

export default connect(mapStateToProps)(Right)
