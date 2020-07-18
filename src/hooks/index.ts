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
import { useUpdateCurrentUserSocialMediasMutation } from './useUpdateCurrentUserSocialMediasMutation'

export {
  useAuth,
  useGetCurrentUserPosts,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  getCurrentUserQuery,
  useUpdateCurrentUserInformationMutation,
  useUpdateCurrentUserProfileImageUrlMutation,
  useUpdateCurrentUserSocialMediasMutation
}

export type {
  CurrentUserType,
  GetCurrentUserQueryDataType,
  UpdateCurrentUserInformationMutationDataType
}
