import React, { Component } from 'react'
import Plus from 'react-icons/lib/fa/plus'

export default class AddQuestion extends Component {

  render() {
    return (
      <div className="addQuestion">
        <div className="circle">
          <Plus />
        </div>
        <div className="label">Add a Question</div>
        <div className="blurb">Drag a question from the left and drop it here</div>
      </div>
    )
  }
}
