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

  if (isQueryLoading || !isAuthorized || !currentUser) {
    return null
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:content-start mx-auto lg:w-9/12">
        <section className="bg-white flex flex-col p-6 lg:w-2/6 shadow-2xl lg:mr-3 lg:mb-0 mb-3">
          <ProfileImage currentUser={currentUser} />
          <Bio currentUser={currentUser} />
        </section>
        <section className="bg-white flex flex-col w-full p-6 shadow-2xl">
          <CurrentUserPosts />
        </section>
      </div>
    </Layout>
  )
}

export default Me
