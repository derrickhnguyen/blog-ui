import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useAuth } from '@hooks'

const Navigation = () => {
  const { isAuthorized, isQueryLoading, logOut } = useAuth()
  const [isLogOutCalled, setIsLogOutCalled] = React.useState(false)

  React.useEffect(() => {
    if (isLogOutCalled && !isAuthorized) {
      Router.push('/login')
    }
  }, [isLogOutCalled, isAuthorized])

  if (isQueryLoading) {
    return null
  }

  const AuthorizedRoutes = () => (
    <nav className="flex h-full">
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
    <div className="flex justify-between bg-white text-black p-4 h-nav items-center content-center">
      <Link href={`${isAuthorized ? '/me' : '/login'}`}>
        <a href={`${isAuthorized ? '/me' : '/login'}`}>
          <h1 className="font-logo text-3xl uppercase">Blogr</h1>
        </a>
      </Link>
      {isAuthorized && <AuthorizedRoutes />}
    </div>
  )
}

export default Navigation
