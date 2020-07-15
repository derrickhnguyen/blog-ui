import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

type GetCurrentUserPostsDataType = {
  getCurrentUser: {
    currentUser: {
      posts: Omit<NexusGenFieldTypes['UserPosts'], 'results'> & {
        results: NexusGenFieldTypes['Post'][]
      }
    }
  }
}

const getCurrentUserPosts = gql`
  query getCurrentUserPosts($limit: Int = 10, $after: String) {
    getCurrentUser {
      currentUser {
        id
        firstName
        lastName
        posts(input: { limit: $limit, after: $after }) {
          results {
            id
            title
            createdAt
            updatedAt
          }
          totalResults
        }
      }
    }
  }
`

interface UseGetCurrentUserPostsParams {
  limit?: number
  after?: string
}

export const useGetCurrentUserPosts = (
  params?: UseGetCurrentUserPostsParams
) => {
  const { limit = 12, after } = params || {}

  const { data, loading } = useQuery<GetCurrentUserPostsDataType>(
    getCurrentUserPosts,
    { variables: { limit, after } }
  )
  const { currentUser } = data?.getCurrentUser || {}
  const { posts } = currentUser || {}
  const { results = [], totalResults = 0 } = posts || {}

  return { loading, results, totalResults }
}

export default useGetCurrentUserPosts
