class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector 
  }
  get style() {
    return this.$el.style
  }
  get dataset() {
    return this.$el.dataset
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendCild(node)
    }  
    return this  
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
  }
  getStyles(styles=[]) {    
    return styles.reduce((res, s) => {     
      res[s] = this.$el.style[s]
      return res
    }, {})
  }
  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.dataset.id
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    this.$el.getAttribute(name)
    return this
  }
  findById(id) {
    if (typeof id != 'object' && typeof id != 'string') {
      console.log('Provide correct id')
      return
    }
    if (typeof id === 'object') {
      id = `${id.row}:${id.col}`      
    } 
    return this.find(`[data-id="${id}"]`)    
  } 
  focus() {
    this.$el.focus()
    return this
  }
  text(text) {
    if (typeof text !== 'undefined') {
      if (this.$el.tagName.toLowerCase() === 'input') {
        this.$el.value = text
        return this
      }
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
} 
