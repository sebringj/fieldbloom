import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddQuestion from '../components/AddQuestion'
import { DropTarget } from 'react-dnd'
import * as actions from '../actions'
import * as Questions from '../components/Questions'
import ItemTypes from '../lib/ItemTypes'

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const target = {
  drop(props) {

  }
}

class Center extends Component {
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className={'center' + (isOver ? ' highlight' : '')}>
        {this.props.questions.map((question, i) => {
          let QuestionClass = Questions[question.get('class')]
          return (
            <QuestionClass
              key={question.get('id')}
              question={question}
              index={i}
              selected={this.props.selectedIndex === i}
            />
          )
        })}
        <AddQuestion />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedIndex: state.get('selectedIndex'),
    questions: state.get('questions')
  }
}

export default connect(mapStateToProps)(DropTarget(ItemTypes.ICON, target, collect)(Center))
