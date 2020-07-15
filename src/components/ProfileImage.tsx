import React from 'react'
import {
  CurrentUserType,
  useUpdateCurrentUserInformationMutation
} from '@hooks'

interface ProfileImageProps {
  currentUser: CurrentUserType
}

const ProfileImage = ({ currentUser }: ProfileImageProps) => {
  const { firstName, lastName, profile } = currentUser || {}
  const [profileImageUrl, setProfileImageUrl] = React.useState(
    profile?.profileImageUrl
  )
  const fileUploaderRef = React.useRef<HTMLInputElement>()

  const [
    updateCurrentUserInformation
  ] = useUpdateCurrentUserInformationMutation()

  const openProfilePictureUploader = () => fileUploaderRef.current.click()
  const uploadProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [profilePicture] = Array.from(e.target.files)
    const data = new FormData()
    data.append('file', profilePicture)
    data.append('upload_preset', 'blogr_app')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/derrickhnguyen/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    await updateCurrentUserInformation({
      variables: {
        input: {
          updatableCurrentUserInformation: { profileImageUrl: file.secure_url }
        }
      }
    })

    setProfileImageUrl(file.secure_url)
  }

  return (
    <>
      {profileImageUrl && (
        <button
          className="mb-5 flex mx-auto focus:outline-none focus:shadow-outline hover:opacity-75"
          onClick={openProfilePictureUploader}
        >
          <img alt={`${firstName} ${lastName}`} src={profileImageUrl} />
        </button>
      )}
      {!profileImageUrl && (
        <div>
          <button
            className="mb-5 hover:bg-gray-100 hover:text-gray-600 text-gray-700 flex h-56 w-auto p-3 mx-auto justify-center text-center items-center content-center border border-gray-700 border-solid focus:outline-none focus:shadow-outline"
            onClick={openProfilePictureUploader}
          >
            Click here to upload a profile picture
          </button>
        </div>
      )}
      <input
        ref={fileUploaderRef}
        id="profile-picture-uploader"
        className="hidden"
        type="file"
        onChange={uploadProfilePicture}
      />
    </>
  )
}

export default ProfileImage
