import gql from 'graphql-tag'
import { useQuery, useLazyQuery, QueryTuple } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

export type CurrentUserType = Omit<
  NexusGenFieldTypes['CurrentUser'],
  'profile'
> & {
  profile: NexusGenFieldTypes['UserProfile']
}

export type GetCurrentUserQueryDataType = {
  getCurrentUser: {
    currentUser: CurrentUserType
    successful: boolean
  }
}

export const getCurrentUserQuery = gql`
  query getCurrentUser {
    getCurrentUser {
      currentUser {
        id
        firstName
        lastName
        email
        profile {
          bio
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

export const useGetCurrentUserQuery = () => {
  const { data, loading } = useQuery<GetCurrentUserQueryDataType>(
    getCurrentUserQuery
  )
  const { currentUser, successful } = data?.getCurrentUser || {}

  return { currentUser, loading, successful }
}

export const useLazyGetCurrentUserQuery = (): [
  QueryTuple<GetCurrentUserQueryDataType, any>[0],
  {
    called: boolean
    loading: boolean
    successful?: boolean
    currentUser?: CurrentUserType
  }
] => {
  const [getCurrentUser, { called, loading, data }] = useLazyQuery<
    GetCurrentUserQueryDataType
  >(getCurrentUserQuery, { fetchPolicy: 'network-only' })
  const { currentUser, successful } = data?.getCurrentUser || {}

  return [getCurrentUser, { called, loading, successful, currentUser }]
}

export default useGetCurrentUserQuery
