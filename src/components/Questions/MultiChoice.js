import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../lib/ItemTypes'
import * as actions from '../../actions'
import { findDOMNode } from 'react-dom'

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class MultiChoice extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ dropped: true })
      findDOMNode(this).scrollIntoView({ behavior: 'smooth'} )
    }, 100)
  }

  onClick = () => {
    actions.selectQuestion(
      this.props.question,
      this.props.index,
      findDOMNode(this).offsetTop
    )
  }

  render() {
    const cssClasses = ['question','multiChoice']
    if (this.props.selected)
      cssClasses.push('selected')
    if (this.state.dropped)
      cssClasses.push('dropped')

    const { x, y, connectDragSource, isOver, canDrop } = this.props;
    return connectDragSource(
      <div
        onClick={this.onClick}
        className={cssClasses.join(' ')}>
        <div className="title">
          <div className="q">{'Q'+(this.props.index+1)}</div>
          {this.props.question.get('title')}
        </div>
        <div className="choices">
          {this.props.question.get('choices').map(choice => (
            <div className="choice" key={choice.get('id')}>{choice.get('text')}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default DragSource(ItemTypes.QUESTION, source, collect)(MultiChoice)
