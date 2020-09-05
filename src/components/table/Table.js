import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
// import {$} from '@core/dom'
import {resizeTable} from './table.resize'
import {shouldResize} from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    })
  }

  toHTML() {
    return createTable(20)
  }   
  
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root)
    }
  }
  
  onMouseup() {
    
  } 
}
