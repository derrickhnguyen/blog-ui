import React from 'react'
import Router from 'next/router'
import { FacebookLoginButton, FacebookResponseType, Layout } from '@components'
import { useAuth } from '@hooks'
import { fetch } from '@lib'

const Login = () => {
  const { isAuthorized, isQueryLoading, logIn } = useAuth()

  React.useEffect(() => {
    if (isAuthorized && !isQueryLoading) {
      Router.push('/me')
    }
  }, [isAuthorized, isQueryLoading])

  const onFacebookResponse = async ({ accessToken }: FacebookResponseType) => {
    const resp = await fetch(
      `http://localhost:8000/auth/facebook/token?access_token=${accessToken}`
    )
    const { success } = await resp.json()

    if (success) {
      logIn()
    }
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center content-center items-center mx-auto bg-white w-full sm:w-6/12 md:w-1/3 sm:my-auto py-6 shadow-2xl">
        <h1 className="text-xl mb-8">Register / Sign In</h1>
        <FacebookLoginButton onFacebookResponse={onFacebookResponse} />
      </div>
    </Layout>
  )
}

export default Login
