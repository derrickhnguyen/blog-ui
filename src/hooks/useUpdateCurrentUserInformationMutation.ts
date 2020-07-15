import gql from 'graphql-tag'
import { useMutation, MutationTuple } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

export type UpdateCurrentUserInformationType = Omit<
  NexusGenFieldTypes['UpdateCurrentUserInformationPayload'],
  'user'
> & { user: NexusGenFieldTypes['User'] }

export type UpdateCurrentUserInformationMutationDataType = {
  updateCurrentUserInformation: UpdateCurrentUserInformationType
}

const updateCurrentUserInformationInformationMutation = gql`
  mutation updateCurrentUserInformation(
    $input: UpdateCurrentUserInformationInput!
  ) {
    updateCurrentUserInformation(input: $input) {
      user {
        id
        profile {
          bio
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

export const useUpdateCurrentUserInformationMutation = (): [
  MutationTuple<UpdateCurrentUserInformationMutationDataType, any>[0],
  {
    called: boolean
    loading: boolean
    data: UpdateCurrentUserInformationMutationDataType
  }
] => {
  const [updateCurrentUserInformation, { called, loading, data }] = useMutation<
    UpdateCurrentUserInformationMutationDataType
  >(updateCurrentUserInformationInformationMutation)

  return [updateCurrentUserInformation, { called, loading, data }]
}

export default useUpdateCurrentUserInformationMutation
