import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {    
    this.$formula = this.$root.find('#formula')
    super.init()    
    this.$on('table:select', $cell => {     
      this.$formula.text($cell.dataset.value)
    })
    // this.$on('table:input', content => {      
    // this.$formula.text(content)
    // })
    // this.$subscribe( state => {
    // this.$formula.text(state.currentText)
    // })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }
  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }
  onInput(event) {    
    this.$emit('formula:input', $(event.target).text())
  }
  onKeydown(event) {    
    const keys = ['Enter', 'Tab']
    const {key} = event
    if (keys.includes(key)) {
      event.preventDefault() 
      this.$emit('formula:enter')            
    } 
  }  
}
