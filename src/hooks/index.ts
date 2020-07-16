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
import { useUpdateCurrentUserProfileImageUrlMutation } from './useUpdateCurrentUserProfileImageUrlMutation'

export {
  useAuth,
  useGetCurrentUserPosts,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  getCurrentUserQuery,
  useUpdateCurrentUserInformationMutation,
  useUpdateCurrentUserProfileImageUrlMutation
}

export type {
  CurrentUserType,
  GetCurrentUserQueryDataType,
  UpdateCurrentUserInformationMutationDataType
}
