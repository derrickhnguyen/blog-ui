import React from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components'
import {
  useProseMirror,
  useGetCurrentUserPost,
  useUpdateCurrentUserProfileImageUrlMutation
} from '@hooks'

const HeaderImage = ({
  className = '',
  headerImageUrl,
  title
}: {
  className?: string
  headerImageUrl?: string
  title?: string
}) => {
  const [
    updateCurrentUserProfileImageUrl
  ] = useUpdateCurrentUserProfileImageUrlMutation()

  return (
    <div
      style={{ backgroundImage: `url('${headerImageUrl}')` }}
      className={`flex flex-col justify-center items-center content-center ${className} bg-cover bg-center`}
    >
      <h1 className="text-3xl">{title}</h1>
    </div>
  )
}

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  const { setNodeRef } = useProseMirror()

  const { post, loading } = useGetCurrentUserPost({
    postId: typeof pid === 'string' ? pid : undefined,
    skip: typeof pid !== 'string'
  })

  const [headerImageUrl, setHeaderImageUrl] = React.useState<string>()
  const [title, setTitle] = React.useState<string>()

  React.useEffect(() => {
    if (headerImageUrl !== post?.headerImageUrl) {
      setHeaderImageUrl(post?.headerImageUrl)
    }

    if (title !== post?.title) {
      setTitle(post?.title)
    }
  }, [post])

  if (loading || !post) {
    return null
  }

  return (
    <Layout>
      <div className="flex flex-col w-full">
        <HeaderImage
          className="h-postHeaderImage"
          headerImageUrl={headerImageUrl}
          title={title}
        />
        <div className="bg-white w-full h-full">
          <div className="w-full h-full" ref={setNodeRef} />
        </div>
      </div>
    </Layout>
  )
}

export default Post
