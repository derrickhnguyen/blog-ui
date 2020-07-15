import useAuth from './useAuth'
import { useGetCurrentUserPosts } from './useGetCurrentUserPosts'
import {
  CurrentUserType,
  GetCurrentUserQueryDataType,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  getCurrentUserQuery
} from './useGetCurrentUserQuery'
import {
  UpdateCurrentUserInformationMutationDataType,
  useUpdateCurrentUserInformationMutation
} from './useUpdateCurrentUserInformationMutation'

export {
  useAuth,
  useGetCurrentUserPosts,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  getCurrentUserQuery,
  useUpdateCurrentUserInformationMutation
}

export type {
  CurrentUserType,
  GetCurrentUserQueryDataType,
  UpdateCurrentUserInformationMutationDataType
}
