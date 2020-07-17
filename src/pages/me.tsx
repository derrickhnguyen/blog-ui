import React from 'react'
import Router from 'next/router'
import { Bio, CurrentUserPosts, Layout, ProfileImage } from '@components'
import { useAuth } from '@hooks'

const Me = () => {
  const { currentUser, isAuthorized, isQueryLoading } = useAuth()

  React.useEffect(() => {
    if (!isQueryLoading && !isAuthorized) {
      Router.push('/login')
    }
  }, [isQueryLoading, isAuthorized])

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:content-start mx-auto max-h-full">
        <section className="bg-white flex flex-col p-4 lg:w-1/5 shadow-2xl mb-4 lg:mr-2 lg:mb-0 lg:h-full lg:max-h-full overflow-auto">
          <ProfileImage currentUser={currentUser} />
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
