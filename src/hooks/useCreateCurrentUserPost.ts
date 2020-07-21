import gql from 'graphql-tag'
import { useMutation, MutationTuple } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

export type CreateCurrentUserPostType = Omit<
  NexusGenFieldTypes['CreateCurrentUserPostPayload'],
  'post'
> & { post: NexusGenFieldTypes['Post'] }

export type CreateCurrentUserPostDataType = {
  createCurrentUserPost: CreateCurrentUserPostType
}

const createCurrentUserPostMutation = gql`
  mutation createCurrentUserPost {
    createCurrentUserPost {
      post {
        id
        content
        createdAt
        published
        title
        updatedAt
        author {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const useCreateCurrentUserPost = (): [
  MutationTuple<CreateCurrentUserPostDataType, any>[0],
  {
    called: boolean
    loading: boolean
    data: CreateCurrentUserPostDataType
  }
] => {
  const [createCurrentUserPost, { called, loading, data }] = useMutation<
    CreateCurrentUserPostDataType
  >(createCurrentUserPostMutation)

  return [createCurrentUserPost, { called, loading, data }]
}
