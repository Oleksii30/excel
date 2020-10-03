import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from './header.template'
import * as actions from '@/redux/actions'
import {debounce, removeFromStorage} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'
import {$} from '@core/dom'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header', 
      listeners: ['input', 'click'],        
      ...options
    })
  }  
  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }
  toHTML() {    
    return createHeader(this.store.getState())
  }  
  onInput(event) {
    const value = event.target.value
    this.$dispatch(actions.changeTitle(value))
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.dataset.button === 'remove') {
      const decision = confirm('Do you realy want to remove this table?')
      if (decision) {
        const key = `excel:${ActiveRoute.param}`
        removeFromStorage(key)
        ActiveRoute.navigate('')
      }      
    } else if ($target.dataset.button === 'exit') {     
      ActiveRoute.navigate('')
    }
  }
}
