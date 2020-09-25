import {CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE} from './types'

export function rootReducer(state, action) {  
  let field
  let val
  console.log('ACTION', action)
  switch (action.type) {
    case TABLE_RESIZE:  
      field = action.payload.type === 'col' ? 'colState' : 'rowState'     
      return {...state, [field]: value(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'              
      return {...state, currentText: action.payload.value, [field]: value(state, field, action)}
    case CURRENT_STYLES:
      return {...state, currentStyles: action.payload}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.payload.ids.forEach(id => {
        val[id] = {...val[id], ...action.payload.value}
      })
      return {
        ...state,
        [field]: val,        
        currentStyles: {...state.currentStyles, ...action.payload.value}
      }
    case CHANGE_TITLE:
      field = 'currentTitle'
      return {
        ...state,
        [field]: action.payload
      }
    default: return state
  }
}

function value(state, field, action) {
  const value = state[field] || {}
  value[action.payload.id] = action.payload.value
  return value
}
