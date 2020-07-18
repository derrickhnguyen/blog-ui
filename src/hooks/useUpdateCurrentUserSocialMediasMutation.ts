import gql from 'graphql-tag'
import { useMutation, MutationTuple } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

export type UpdateCurrentUserSocialMediasType = Omit<
  NexusGenFieldTypes['UpdateCurrentUserSocialMediasPayload'],
  'user'
> & { user: NexusGenFieldTypes['User'] }

export type UpdateCurrentUserSocialMediasDataType = {
  updateCurrentUserSocialMedias: UpdateCurrentUserSocialMediasType
}

const updateCurrentUserSocialMediasMutation = gql`
  mutation updateCurrentUserSocialMedias(
    $input: UpdateCurrentUserSocialMediasInput!
  ) {
    updateCurrentUserSocialMedias(input: $input) {
      user {
        id
        profile {
          facebookUrl
          instagramUrl
          twitterUrl
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

export const useUpdateCurrentUserSocialMediasMutation = (): [
  MutationTuple<UpdateCurrentUserSocialMediasDataType, any>[0],
  {
    called: boolean
    loading: boolean
    data: UpdateCurrentUserSocialMediasDataType
  }
] => {
  const [
    updateCurrentUserSocialMedias,
    { called, loading, data }
  ] = useMutation<UpdateCurrentUserSocialMediasDataType>(
    updateCurrentUserSocialMediasMutation
  )

  return [updateCurrentUserSocialMedias, { called, loading, data }]
}
