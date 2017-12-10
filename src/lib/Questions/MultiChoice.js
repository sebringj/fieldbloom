import ItemTypes from '../ItemTypes'
const { Map, List } = require('immutable')

export default Map({
  class: 'MultiChoice',
  classLabel: 'Multi Choice',
  title: 'Which country do you live in?',
  choices: List([
    Map({ id: Math.random(), text: 'United States' }),
    Map({ id: Math.random(), text: 'Canada' }),
    Map({ id: Math.random(), text: 'Australia' })
  ])
})
