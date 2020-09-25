import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, index) {  
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}
/* function getCellValue(state, id) {  
  return state[id] || ''
}*/

function toCell(state, rowIndex) {  
  return function(_, colIndex) { 
    const id = `${rowIndex}:${colIndex}`
    const width = getWidth(state.colState, colIndex)
    const value = state.dataState[id] 
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })       
    return `
      <div 
        class="cell"        
        contenteditable 
        style="${styles};width:${width}"
        data-colnumber="${colIndex}"       
        data-type="cell"
        data-value="${value || ''}"
        data-id="${id}">
        ${parse(value)}
      </div>
    `
  }  
}

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-colnumber="${index}" style="width:${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index, state) {
  const height = getHeight(state.rowState, index)
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" 
         data-type="resizable" 
         data-rownumber="${index}"
         style="height:${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>    
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {col, index, width: getWidth(state.colState, index)}
  } 
}

export function createTable(rowsCount = 40, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1  
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')
  
  rows.push(createRow(cols, '', state))  
  
  for (let i = 0; i < rowsCount; i++) {     
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, i))
        .join('')
    rows.push(createRow(cells, i+1, state))
  }

  return rows.join('')
}
