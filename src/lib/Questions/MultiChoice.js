import ItemTypes from '../ItemTypes'
const { Map, List } = require('immutable')

export default Map({
  class: 'MultiChoice',
  classLabel: 'Multi Choice',
  title: 'Which country do you live in?',
  choices: List([
    'United States', 'Canada', 'Australia'
  ])
})
