import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'
import {Loader} from '../Loader'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }  
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.loader = new Loader()
    this.pageChangeHandler = this.pageChangeHandler.bind(this)
    this.init()    
  }
  init() {
    window.addEventListener('hashchange', this.pageChangeHandler)
    this.pageChangeHandler()
  }
  async pageChangeHandler(event) {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)  
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard  
    this.page = new Page(ActiveRoute.param)  
    const root = await this.page.getRoot()    
    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }
  destroy() {
    window.removeEventListener('hashchange', this.pageChangeHandler)
  }  
}
