import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as EditQuestions from '../components/EditQuestions'

class Right extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showEnabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      this.setState({ showEnabled: false }, () => {
        setTimeout(() => {
          this.setState({ showEnabled: true })
        }, 100)
      })
    }
  }

  render() {
    if (this.props.selectedIndex === -1)
      return null

    const question = this.props.questions.get(this.props.selectedIndex)

    let QuestionClass = EditQuestions[question.get('class')]

    let cssClasses = ['right']
    if (this.state.showEnabled)
      cssClasses.push('show')

    let offsetTop = this.props.selectedOffsetTop

    return (
      <div className={cssClasses.join(' ')}>
        <div style={{ height: offsetTop >= 0 ? offsetTop : 0 }}></div>
        <QuestionClass question={question} {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  // todo: must be way to grab multiple keys at the same time in immutable?
  return {
    selectedOffsetTop: state.get('selectedOffsetTop'),
    selectedIndex: state.get('selectedIndex'),
    questions: state.get('questions')
  }
}

export default connect(mapStateToProps)(Right)
