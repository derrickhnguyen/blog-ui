import React from 'react'
import { useRouter } from 'next/router'
import {
  Bio,
  CurrentUserPosts,
  Layout,
  ProfileImage,
  SocialMedia
} from '@components'
import { useAuth } from '@hooks'

const Me = () => {
  const { currentUser, isAuthorized, isQueryLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isQueryLoading && !isAuthorized) {
      router.push('/login')
    }
  }, [router, isQueryLoading, isAuthorized])

  if (isQueryLoading || !currentUser) {
    return null
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:content-start w-full mx-auto max-h-full">
        <section className="bg-white flex flex-col p-4 lg:w-1/5 shadow-2xl mb-4 lg:mr-2 lg:mb-0 lg:max-h-full overflow-auto">
          <ProfileImage currentUser={currentUser} />
          <SocialMedia currentUser={currentUser} />
          <Bio currentUser={currentUser} />
        </section>
        <section className="bg-white flex flex-col w-full p-4 shadow-2xl lg:h-full">
          <CurrentUserPosts />
        </section>
      </div>
    </Layout>
  )
}

export default Me
