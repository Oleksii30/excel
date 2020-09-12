import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',      
      ...options
    })
  }

  toHTML() {
    return `
      <input class="input" value="New table" type="text" />
                <div>
                    <div class="button">
                        <i class="material-icons">delete</i>
                    </div>
                    <div class="button">
                        <i class="material-icons">exit_to_app</i>
                    </div>
                </div>
    `
  }
}
