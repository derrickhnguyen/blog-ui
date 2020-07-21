import React from 'react'
import OrderedMap from 'orderedmap'
import { DOMParser, MarkSpec, NodeSpec } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { getSchema } from './schema'
import { getPlugins } from './plugins'
import { htmlToNode } from './utils'

export interface UseProseMirrorParams {
  htmlValue?: string
  marks?: OrderedMap<MarkSpec>
  nodes?: OrderedMap<NodeSpec>
}

export const useProseMirror = (args?: UseProseMirrorParams) => {
  const { htmlValue, marks, nodes } = args || {}
  const [editorState, setEditorState] = React.useState<EditorState>()
  const [editorView, setEditorView] = React.useState<EditorView>()

  const nodeRef = React.useRef<HTMLElement>()

  const setNodeRef = React.useCallback((instance?: HTMLElement) => {
    if (!instance) {
      console.warn('Cannot call setNodeRef with undefined as an argument.')
      return
    }

    nodeRef.current = instance
    const schema = getSchema({ marks, nodes })

    const newEditorState = EditorState.create({
      doc: DOMParser.fromSchema(getSchema({ marks, nodes })).parse(
        htmlToNode(htmlValue)
      ),
      plugins: getPlugins({ schema })
    })
    const newEditorView = new EditorView(instance, { state: newEditorState })

    setEditorState(newEditorState)
    setEditorView(newEditorView)
  }, [])

  return { editorState, editorView, nodeRef, setNodeRef }
}

export default useProseMirror
