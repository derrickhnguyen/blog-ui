import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Button from './Button'
import { useAuth, useCreateCurrentUserPost } from '@hooks'

const Navigation = () => {
  const { isAuthorized, isQueryLoading, logOut } = useAuth()
  const [isLogOutCalled, setIsLogOutCalled] = React.useState(false)
  const [createCurrentUserPost] = useCreateCurrentUserPost()

  React.useEffect(() => {
    if (isLogOutCalled && !isAuthorized) {
      Router.push('/login')
    }
  }, [isLogOutCalled, isAuthorized])

  if (isQueryLoading) {
    return null
  }

  const onCreateCurrentUserPost = async () => {
    const { data } = await createCurrentUserPost()
    const { post } = data.createCurrentUserPost

    Router.push(`/posts/${post.id}`)
  }

  const AuthorizedRoutes = () => (
    <nav className="flex h-full">
      <Button type="secondary" onClick={() => onCreateCurrentUserPost()}>
        Create
      </Button>
      <button
        onClick={() => {
          logOut()
          setIsLogOutCalled(true)
        }}
        className="flex items-center content-center p-2 hover:bg-gray-200"
      >
        Log Out
      </button>
    </nav>
  )

  return (
    <div className="flex justify-between bg-white text-black p-4 h-nav">
      <Link href={`${isAuthorized ? '/me' : '/login'}`}>
        <a href={`${isAuthorized ? '/me' : '/login'}`}>
          <h1 className="font-logo text-2xl uppercase">Blogr</h1>
        </a>
      </Link>
      {isAuthorized && <AuthorizedRoutes />}
    </div>
  )
}

export default Navigation
