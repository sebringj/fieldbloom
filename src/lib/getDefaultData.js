import ItemTypes from './ItemTypes'
import * as Questions from './Questions'
const { Map, List } = require('immutable')

const defaultData = {
  [ItemTypes.ICON]: {
    multiChoice: Questions.MultiChoice
  }
}

function getDefaultData(type, subType) {
  return defaultData[type][subType]
}

export default getDefaultData
