import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAuth } from '@hooks'

const Home: NextPage = () => {
  const { isAuthorized, isQueryLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isQueryLoading && !isAuthorized) {
      router.push('/login')
    }

    if (!isQueryLoading && isAuthorized) {
      router.push('/me')
    }
  }, [isQueryLoading, isAuthorized, router])

  return null
}

export default Home
