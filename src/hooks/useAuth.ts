import React from 'react'
import { AuthActionTypeEnum, AuthContext } from '@providers'
import { useLazyGetCurrentUserQuery } from './useGetCurrentUserQuery'

const useAuth = () => {
  const [state, dispatch] = React.useContext(AuthContext)

  const [
    getCurrentUser,
    { called, successful, currentUser, loading }
  ] = useLazyGetCurrentUserQuery()
  React.useEffect(() => {
    if (called && !loading && successful) {
      dispatch({ type: AuthActionTypeEnum.LogIn, payload: { currentUser } })
    }
  }, [called, loading, currentUser, dispatch, successful])

  const logIn = () => getCurrentUser()

  const logOut = async () => {
    const resp = await fetch('http://localhost:8000/auth/signout', {
      credentials: 'include'
    })
    const { success } = await resp.json()

    if (success) {
      dispatch({ type: AuthActionTypeEnum.LogOut })
    }
  }

  return { ...state, logIn, logOut }
}

export default useAuth
