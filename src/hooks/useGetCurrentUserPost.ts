import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { NexusGenFieldTypes } from '@generated/schema'

type GetCurrentUserPostsDataType = {
  getCurrentUserPost: Omit<
    NexusGenFieldTypes['GetCurrentUserPostPayload'],
    'post'
  > & {
    post: Omit<NexusGenFieldTypes['Post'], 'author'> & {
      author: NexusGenFieldTypes['RegularUser']
    }
  }
}

const getCurrentUserPost = gql`
  query getCurrentUserPost($input: GetCurrentUserPostInput!) {
    getCurrentUserPost(input: $input) {
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
      successful
      userErrors {
        message
        code
      }
    }
  }
`

interface UseGetCurrentUserPostParams {
  postId?: string
  skip?: boolean
}

export const useGetCurrentUserPost = (params: UseGetCurrentUserPostParams) => {
  const { postId, skip } = params

  const { data, loading } = useQuery<GetCurrentUserPostsDataType>(
    getCurrentUserPost,
    {
      variables: { input: { postId } },
      skip
    }
  )

  const { post, successful, userErrors } = data?.getCurrentUserPost || {}

  return { post, successful, userErrors, loading }
}

export default useGetCurrentUserPost
