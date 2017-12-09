import React, { Component } from 'react'
import Icon from '../components/Icon'

export default class Left extends Component {
  render() {
    return (
      <div className="left">
        <img src="./logo.png" className="logo" />
        <Icon icon="multiChoice" label="Multi Choice" />
      </div>
    )
  }
}
