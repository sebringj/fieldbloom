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
          let data = question.toObject()
          let QuestionClass = Questions[data.class]
          return <QuestionClass key={data.id} {...data} order={i+1} />
        })}
        <AddQuestion />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    questions: state.get('questions').toArray()
  }
}

export default connect(mapStateToProps)(DropTarget(ItemTypes.ICON, target, collect)(Center))
