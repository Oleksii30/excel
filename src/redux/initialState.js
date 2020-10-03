import {defaultStyles} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentTitle: 'New table',
  currentStyles: defaultStyles,
  openDate: new Date().toJSON()
}

const normalize = state =>( {
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const normalizeInitialState = state => {
  return state ? normalize(state) : clone(defaultState)
}
