import { Schema } from 'prosemirror-model'

export const htmlToNode = (html = '') => {
  const div = document.createElement('div')
  div.innerHTML = html.trim()

  return div
}
