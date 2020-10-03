export function createHeader({currentTitle}) {
  return `
    <input class="input" value="${currentTitle}" type="text" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
          <div class="button" data-button="exit">
            <i class="material-icons" data-button="exit">exit_to_app</i>
          </div>
      </div>
`
}
