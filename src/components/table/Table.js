import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, nextId} from './table.functions'
import {TableSelection} from './TableSelections'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

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
    return createTable(20, this.store.getState())
  }  
  prepare() {
    this.selection = new TableSelection(this.$root)
  } 
  init() {
    super.init()        
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    }) 
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds 
      }))
    })
    /* this.$subscribe(data => {
      console.log(data)
    }) */    
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))    
    this.$dispatch(actions.changeStyles(styles))
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)      
      this.$dispatch(actions.tableResize(data))      
    } catch (error) {
      console.warn(error.message) 
    }    
  }
  
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const el = $(event.target)      
      if (event.shiftKey) {
        this.selection.selectGroup(el)
      } else {
        this.selectCell(el)
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
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }
  onInput(event) {
    // this.$emit('table:input', $(event.target).text())   
    this.updateTextInStore($(event.target).text())    
  } 
}
