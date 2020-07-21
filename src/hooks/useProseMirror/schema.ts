import { DOMOutputSpec, MarkSpec, NodeSpec, Schema } from 'prosemirror-model'
import OrderedMap from 'orderedmap'

const pDOM: DOMOutputSpec = ['p', 0]

const defaultNodes = OrderedMap.from({
  doc: {
    content: 'block+'
  },
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return pDOM
    }
  },
  heading: {
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } }
    ],
    toDOM(node) {
      return ['h' + node.attrs.level, 0] as DOMOutputSpec
    }
  },
  text: { group: 'inline' }
})

const emDOM: DOMOutputSpec = ['em', 0]
const strongDOM: DOMOutputSpec = ['strong', 0]

const defaultMarks = OrderedMap.from({
  em: {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return emDOM
    }
  },
  strong: {
    parseDOM: [
      { tag: 'strong' },
      { tag: 'b', getAttrs: node => node.style.fontWeight != 'normal' && null },
      {
        style: 'font-weight',
        getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ],
    toDOM() {
      return strongDOM
    }
  }
})

interface GetSchemaParams {
  marks?: OrderedMap<MarkSpec>
  nodes?: OrderedMap<NodeSpec>
}

export const getSchema = (args?: GetSchemaParams) => {
  const { marks = defaultMarks, nodes = defaultNodes } = args || {}

  return new Schema({ marks, nodes })
}
