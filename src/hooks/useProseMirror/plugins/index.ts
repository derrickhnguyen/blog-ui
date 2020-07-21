import { history } from 'prosemirror-history'
import { Schema } from 'prosemirror-model'
import { buildKeyMap } from './keymap'

interface GetPluginsParams {
  schema: Schema
}

export const getPlugins = ({ schema }: GetPluginsParams) => {
  return [buildKeyMap({ schema }), history()]
}
