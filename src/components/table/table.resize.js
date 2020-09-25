import {$} from '@core/dom'

export function resizeHandler(event, $root) {
  return new Promise(resolve => {
    const $resizer = $(event.target)      
    const $parent = $resizer.closest('[data-type="resizable"]')
    const type = event.target.dataset.resize            
    const coords = $parent.getCoords()
    const colAttribute = $parent.dataset.colnumber      
    let value
    const sideProp = type === 'col'? 'bottom' : 'right'     
    $resizer.css({opacity: 1, [sideProp]: -5000 + 'px'})     
             
    document.onmousemove = e => {
      let delta = null
           
      if (type === 'col') {   
        delta = e.pageX - coords.right   
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})          
      } else {
        delta = e.pageY - coords.bottom       
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})             
      }       
    }
    document.onmouseup = () => { 
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        const cellsInColumn = Array.from($root.findAll(`[data-colNumber="${colAttribute}"]`))
        cellsInColumn.shift()      
        cellsInColumn
            .map(el => $(el))   
            .forEach(el => el.style.width = value + 'px')                   
      } else {
        $parent.css({height: value + 'px'})         
      }  
      resolve({
        type,
        value,
        id: type === 'col' ? $parent.dataset.colnumber : $parent.dataset.rownumber
      })
      $resizer.css({opacity: 0, bottom: 0, right: 0})
      document.onmousemove = null
    }
  })  
} 
