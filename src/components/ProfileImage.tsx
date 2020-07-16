import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import {
  CurrentUserType,
  useUpdateCurrentUserProfileImageUrlMutation
} from '@hooks'

interface ProfileImageProps {
  currentUser: CurrentUserType
}

const ProfileImage = ({ currentUser }: ProfileImageProps) => {
  const { firstName, lastName, profile } = currentUser || {}

  const [profileImageUrl, setProfileImageUrl] = React.useState(
    profile?.profileImageUrl
  )

  const [profilePictureHovered, setProfilePictureHovered] = React.useState(
    false
  )

  const fileUploaderRef = React.useRef<HTMLInputElement>()

  const [
    updateCurrentUserProfileImageUrl
  ] = useUpdateCurrentUserProfileImageUrlMutation()

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

    await updateCurrentUserProfileImageUrl({
      variables: { input: { profileImageUrl: file.secure_url } }
    })

    setProfileImageUrl(file.secure_url)
  }

  return (
    <>
      {profileImageUrl && (
        <button
          className="inline-block relative mb-5 mx-auto hover:opacity-75 focus:outline-none focus:shadow-outline"
          onClick={openProfilePictureUploader}
          onMouseOver={() => setProfilePictureHovered(true)}
          onFocus={() => () => setProfilePictureHovered(true)}
          onMouseOut={() => setProfilePictureHovered(false)}
          onBlur={() => setProfilePictureHovered(false)}
        >
          <img alt={`${firstName} ${lastName}`} src={profileImageUrl} />
          <FontAwesomeIcon
            size="sm"
            className={`${
              profilePictureHovered ? '' : 'hidden'
            } absolute top-0 right-0 transform translate-y-1 -translate-x-1  opacity-50`}
            icon={faEdit}
          />
        </button>
      )}
      {!profileImageUrl && (
        <button
          className="mb-5 hover:bg-gray-100 hover:text-gray-600 text-gray-700 flex h-56 w-auto p-3 mx-auto justify-center text-center items-center content-center border border-gray-700 border-solid focus:outline-none focus:shadow-outline"
          onClick={openProfilePictureUploader}
        >
          Click here to upload a profile picture
        </button>
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
