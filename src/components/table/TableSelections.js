import {range} from '@core/utils'

export class TableSelection {
  static className = 'selected'

  constructor($root) {
    this.group = []
    this.$root = $root
    this.current = null
  }
  select($el) {
    this.clear()    
    this.group.push($el) 
    this.current = $el   
    $el.focus().addClass(TableSelection.className)    
  }
  selectGroup(el) {  
    const current = this.current.id(true)
    const target = el.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    const ids = cols.reduce((acc, col) => {
      rows.forEach(row => acc.push(`${row}:${col}`))
      return acc
    }, [])
    const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`))
    this.clear()
    this.group = $cells
    this.group.forEach(el => el.addClass(TableSelection.className))
  }
  clear() {
    this.group.forEach(el => el.removeClass(TableSelection.className))
    this.group = []
  }
}

