import gql from 'graphql-tag'
import { useMutation, MutationTuple } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

export type UpdateCurrentUserProfileImageUrlType = Omit<
  NexusGenFieldTypes['UpdateCurrentUserProfileImageUrlPayload'],
  'user'
> & { user: NexusGenFieldTypes['User'] }

export type UpdateCurrentUserProfileImageUrlDataType = {
  updateCurrentUserProfileImageUrl: UpdateCurrentUserProfileImageUrlType
}

const updateCurrentUserProfileImageUrlMutation = gql`
  mutation updateCurrentUserProfileImageUrl(
    $input: UpdateCurrentUserProfileImageUrlInput!
  ) {
    updateCurrentUserProfileImageUrl(input: $input) {
      user {
        id
        profile {
          profileImageUrl
        }
      }
      successful
      userErrors {
        message
        code
      }
    }
  }
`

export const useUpdateCurrentUserProfileImageUrlMutation = (): [
  MutationTuple<UpdateCurrentUserProfileImageUrlDataType, any>[0],
  {
    called: boolean
    loading: boolean
    data: UpdateCurrentUserProfileImageUrlDataType
  }
] => {
  const [
    updateCurrentUserProfileImageUrl,
    { called, loading, data }
  ] = useMutation<UpdateCurrentUserProfileImageUrlDataType>(
    updateCurrentUserProfileImageUrlMutation
  )

  return [updateCurrentUserProfileImageUrl, { called, loading, data }]
}
