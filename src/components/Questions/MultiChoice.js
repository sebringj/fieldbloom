import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../lib/ItemTypes'
import * as actions from '../../actions'
import { findDOMNode } from 'react-dom'
import TrashO from 'react-icons/lib/fa/trash-o'
import flow from 'lodash/flow'

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const target = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index
		if (dragIndex === hoverIndex)
			return
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
			return
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
			return

    actions.swapQuestions(dragIndex, hoverIndex, findDOMNode(component).offsetTop)
		monitor.getItem().index = hoverIndex
	},
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver()
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

  delete = (ev) => {
    ev.stopPropagation()
    this.setState({ dropped: false }, () => {
      setTimeout(() => {
        actions.deleteQuestion(this.props.question, this.props.index)
      }, 250)
    })
  }

  render() {
    const cssClasses = ['question','multiChoice']
    if (this.props.selected)
      cssClasses.push('selected')
    if (this.state.dropped)
      cssClasses.push('dropped')

    const { x, y, connectDragSource, connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div
          onClick={this.onClick}
          className={cssClasses.join(' ')}>
          <div className="delete" onClick={this.delete}><TrashO /></div>
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
    )
  }
}

export default flow(
  DragSource(ItemTypes.QUESTION, source, collectSource),
  DropTarget(ItemTypes.QUESTION, target, collectTarget)
)(MultiChoice)
