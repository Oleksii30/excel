import {APPLY_STYLE, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE, CHANGE_TITLE, UPDATE_DATE} from './types'

export function tableResize(payload) {
  return {
    type: TABLE_RESIZE,
    payload
  }
}
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    payload: data
  }
}
export function changeStyles(data) {
  return {
    type: CURRENT_STYLES,
    payload: data
  }
}
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    payload: data
  }
}
export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    payload: data
  }
}
export function updateDate() {
  return {
    type: UPDATE_DATE
  }
} 
