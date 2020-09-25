import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.prepare()
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
  }
  prepare() {}

  toHTML() {
    return ''
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  $unsubscribe() {
    this.unsubscribers.forEach(unsub => unsub())
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  // $subscribe(fn) {
  // this.store.subscribe(fn)
  // }
  storeChanged() {}
  isWatching(key) {
    return this.subscribe.includes(key)
  }
  init() {
    this.initDomListeners()
  }
  destroy() {
    this.removeDomListeners()    
    this.$unsubscribe()
  } 
}
