import React, { Component } from 'react'
import { Provider } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import store from './lib/store'
import './scss/app.css';
import { Left, Center, Right } from './sections'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Left />
          <Center />
          <Right />
        </div>
      </Provider>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
