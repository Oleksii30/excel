import {storage} from '@core/utils'

export function toHTML(storageKey) {  
  const {currentTitle, openDate} = storage(storageKey)
  const id = storageKey.split(':')[1]
  const date = getFormatedDate(openDate)
  return `
    <li class="db__record">
      <a href="#excel/${id}">${currentTitle}</a>
      <strong>${date}</strong>
    </li>       
  `
}

function getAllKeys() {
  const keys = []
  for (let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable(dateInString) {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>You haven't made any table</p>`
  }
  
  return `
    <div class="db__list-header">
        <span>Table name</span>
        <span>Opening date</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')} 
    </ul>
  `
}

function getFormatedDate(id) {
  const date = new Date(id)
  return date.toLocaleDateString()  
}
