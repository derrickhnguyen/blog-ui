import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

type GetCurrentUserPostsDataType = {
  getCurrentUser: {
    currentUser: {
      posts: Omit<NexusGenFieldTypes['UserPosts'], 'results'> & {
        results: NexusGenFieldTypes['Post'][]
        paginationCursors: NexusGenFieldTypes['PaginationCursors']
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
          paginationCursors {
            startCursor
            endCursor
          }
        }
      }
    }
  }
`

interface UseGetCurrentUserPostsParams {
  limit?: number
  after?: string
  before?: string
}

export const useGetCurrentUserPosts = (
  params?: UseGetCurrentUserPostsParams
) => {
  const { limit = 12, after, before } = params || {}

  const { data, loading } = useQuery<GetCurrentUserPostsDataType>(
    getCurrentUserPosts,
    { variables: { limit, after, before }, fetchPolicy: 'cache-and-network' }
  )
  const { currentUser } = data?.getCurrentUser || {}
  const { posts } = currentUser || {}
  const { results = [], totalResults = 0, paginationCursors } = posts || {}

  return { loading, results, totalResults, paginationCursors }
}

export default useGetCurrentUserPosts
