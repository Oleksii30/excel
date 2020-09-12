import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'
import {resizeTable} from './table.resize'
import {shouldResize, isCell, nextId} from './table.functions'
import {TableSelection} from './TableSelections'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20)
  }  
  prepare() {
    this.selection = new TableSelection(this.$root)
  } 
  init() {
    super.init()        
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })     
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTable(event, this.$root)
    } else if (isCell(event)) {
      const el = $(event.target)      
      if (event.shiftKey) {
        this.selection.selectGroup(el)
      } else {
        this.selection.select(el)
      }      
    }    
  }  
  onKeydown(event) {  
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.findById(nextId(key, id))
      this.selectCell($next)   
    } 
  }  
  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  } 
}
