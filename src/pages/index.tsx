import React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { useAuth } from '@hooks'

const Home: NextPage = () => {
  const { isAuthorized, isQueryLoading } = useAuth()

  React.useEffect(() => {
    if (!isQueryLoading && !isAuthorized) {
      Router.push('/login')
    } else if (!isQueryLoading && isAuthorized) {
      Router.push('/me')
    }
  }, [isQueryLoading, isAuthorized])

  return null
}

export default Home
