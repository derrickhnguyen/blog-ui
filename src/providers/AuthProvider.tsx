import React from 'react'
import { CurrentUserType, useGetCurrentUserQuery } from '@hooks'

export enum AuthActionTypeEnum {
  LogIn = 'LogIn',
  LogOut = 'LogOut',
  QueryLoading = 'QueryLoading',
  Error = 'Error'
}

export interface AuthContextValueType {
  currentUser?: CurrentUserType
  isAuthorized: boolean
  isQueryLoading: boolean
}

export interface ActionType {
  type: AuthActionTypeEnum
  payload?: Record<string, any>
}

export type AuthContextType = [AuthContextValueType, React.Dispatch<ActionType>]

const defaultAuthContextValue: AuthContextValueType = {
  currentUser: undefined,
  isAuthorized: false,
  isQueryLoading: false
}

const defaultAuthContext: AuthContextType = [
  defaultAuthContextValue,
  () => undefined
]

const authReducer = (state: AuthContextValueType, action: ActionType) => {
  switch (action.type) {
    case AuthActionTypeEnum.QueryLoading:
      return { ...state, isQueryLoading: true }
    case AuthActionTypeEnum.LogIn:
      return {
        ...state,
        isQueryLoading: false,
        currentUser: action.payload.currentUser,
        isAuthorized: true
      }
    case AuthActionTypeEnum.Error:
    case AuthActionTypeEnum.LogOut:
      return defaultAuthContextValue
    default:
      return state
  }
}

export const AuthContext = React.createContext<AuthContextType>(
  defaultAuthContext
)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const reducerTuple = React.useReducer(authReducer, defaultAuthContextValue)
  const [, dispatch] = reducerTuple
  const { currentUser, loading, successful } = useGetCurrentUserQuery()

  React.useEffect(() => {
    if (loading) {
      dispatch({ type: AuthActionTypeEnum.QueryLoading })
    }

    if (!loading && successful) {
      dispatch({ type: AuthActionTypeEnum.LogIn, payload: { currentUser } })
    }

    if (!loading && !successful) {
      dispatch({ type: AuthActionTypeEnum.Error })
    }
  }, [currentUser, loading, dispatch, successful])

  return (
    <AuthContext.Provider value={reducerTuple}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
