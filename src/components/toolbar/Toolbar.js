import {ExcelStateComponent} from '@core/ExelStateComponent'
import {createToolbar} from './toolbar.template'
import {$} from '@core/dom'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {  
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',  
      listeners: ['click'], 
      subscribe: ['currentStyles'],   
      ...options
    })
  }
  get template() {
    return createToolbar(this.state)
  }
  prepare() {   
    this.initState(defaultStyles)
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }
  toHTML() {
    return this.template
  }  
  onClick(event) {
    const $target = $(event.target)    
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)  
      this.$emit('toolbar:applyStyle', value)    
      // this.setState(value)
    }
  }
}
