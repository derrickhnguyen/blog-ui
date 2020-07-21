import { useProseMirror } from './useProseMirror'
import useAuth from './useAuth'
import { useCreateCurrentUserPost } from './useCreateCurrentUserPost'
import useGetCurrentUserPost from './useGetCurrentUserPost'
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
  useProseMirror,
  useAuth,
  useCreateCurrentUserPost,
  useGetCurrentUserPost,
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
