export function shouldResize(event) {
  return event.target.dataset.resize
}
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function nextId(key, id) {
  switch (key) {
    case 'Enter': 
    case 'ArrowDown':
      id.row += 1 
      break
    case 'Tab': 
    case 'ArrowRight': 
      id.col += 1 
      break 
    case 'ArrowUp':
      if (id.row) {
        id.row -= 1 
      }
      break
    case 'ArrowLeft':
      if (id.col) {
        id.col -= 1 
      }
      break                  
  }
  return id
}
