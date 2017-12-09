import React, { Component } from 'react'
import FaThList from 'react-icons/lib/fa/th-list'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../lib/ItemTypes'
import getDefaultData from '../lib/getDefaultData'
import * as actions from '../actions'
import flow from 'lodash/flow'

const iconMap = {
  multiChoice: { IconClass: FaThList, className: 'multiChoice' }
}

const iconSource = {
  beginDrag(props) {
    return {
      type: ItemTypes.ICON,
      icon: props.icon
    }
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop())
      return
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (item.type === ItemTypes.ICON)
      actions.addQuestion(getDefaultData(ItemTypes.ICON, props.icon))
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Icon extends Component {

  onClick = () => {
    actions.addQuestion(getDefaultData(ItemTypes.ICON, this.props.icon))
  }

  render() {
    const { connectDragSource, isDragging } = this.props
    const { IconClass, className } = iconMap[this.props.icon]
    return connectDragSource(
      <div className={`icon ${className}`} onClick={this.onClick}>
        <div className="circle">
          <IconClass />
        </div>
        <div className="label">{this.props.label}</div>
      </div>
    )
  }
}

export default DragSource(ItemTypes.ICON, iconSource, collect)(Icon)
