import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import { undo, redo } from 'prosemirror-history'
import { Schema } from 'prosemirror-model'

const getMarksKeyMap = ({ schema }: { schema: Schema }) => ({
  'Mod-b': toggleMark(schema.marks.strong),
  'Mod-i': toggleMark(schema.marks.em)
})

const undoRedoKeyMap = {
  'Mod-z': undo,
  'Shift-Mod-z': redo
}

interface BuildKeyMapParams {
  schema: Schema
}

export const buildKeyMap = ({ schema }: BuildKeyMapParams) => {
  return keymap({
    ...getMarksKeyMap({ schema }),
    ...baseKeymap,
    ...undoRedoKeyMap
  })
}
