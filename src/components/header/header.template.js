export function createHeader({currentTitle}) {
  return `
    <input class="input" value="${currentTitle}" type="text" />
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
