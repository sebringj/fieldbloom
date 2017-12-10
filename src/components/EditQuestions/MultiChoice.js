import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import ArrowsV from 'react-icons/lib/fa/arrows-v'
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'
import * as actions from '../../actions'
import ItemTypes from '../../lib/ItemTypes'
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

    props.swapChoices(dragIndex, hoverIndex)
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

class Choice extends Component {
  render() {
    const { x, y, connectDragSource, connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div className="choice">
          <ArrowsV className="arrows" />
          <input type="text" value={this.props.choice.get('text')}
            onChange={ev => this.props.onChoiceChange(ev, this.props.choice, this.props.index)} />
          <div className="circle plus">
            <Plus />
          </div>
          <div className="circle minus">
            <Minus />
          </div>
        </div>
      )
    )
  }
}

const ChoiceDragDrop = flow(
  DragSource(ItemTypes.CHOICE, source, collectSource),
  DropTarget(ItemTypes.CHOICE, target, collectTarget)
)(Choice)

class MultiChoice extends Component {

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
            <ChoiceDragDrop
              key={choice.get('id')}
              choice={choice}
              id={choice.get('id')}
              index={i}
              onChoiceChange={this.onChoiceChange}
              swapChoices={(dragIndex, hoverIndex) => actions.swapChoices(this.props.question, dragIndex, hoverIndex)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default flow(
  DragSource(ItemTypes.CHOICE, source, collectSource),
  DropTarget(ItemTypes.CHOICE, target, collectTarget)
)(MultiChoice)
