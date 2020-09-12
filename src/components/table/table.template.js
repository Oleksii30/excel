const CODES = {
  A: 65,
  Z: 90
}

function toCell(rowIndex) {
  return function(_, colIndex) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-colnumber="${colIndex}"       
        data-type="cell"
        data-id="${rowIndex}:${colIndex}">
      </div>
    `
  }  
}

function toColumn(el, index) {
  return `
    <div class="column" data-type="resizable" data-colnumber="${index}">
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable" >
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

export function createTable(rowsCount = 40) {
  const colsCount = CODES.Z - CODES.A + 1
  
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  
  rows.push(createRow(cols, ''))  
  
  for (let i = 0; i < rowsCount; i++) { 
    const rowIndex = i
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(rowIndex))
        .join('')
    rows.push(createRow(cells, i+1))
  }

  return rows.join('')
}
