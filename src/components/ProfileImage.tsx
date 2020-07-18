import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import {
  CurrentUserType,
  useUpdateCurrentUserProfileImageUrlMutation
} from '@hooks'

const cliLoaderCss = css`
  position: absolute;
  top: 40%;
  left: 40%;
`

interface ProfileImageProps {
  currentUser: CurrentUserType
}

const ProfileImage = ({ currentUser }: ProfileImageProps) => {
  const { firstName, lastName, profile } = currentUser || {}

  const [profileImageUrl, setProfileImageUrl] = React.useState(
    profile?.profileImageUrl
  )

  const [isProfileImageUploading, setIsProfileImageUploading] = React.useState(
    false
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

    if (!profilePicture) {
      return
    }

    setIsProfileImageUploading(true)
    const data = new FormData()
    data.append('file', profilePicture)
    data.append('upload_preset', 'blogr_app')

    try {
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

      setIsProfileImageUploading(false)

      setProfileImageUrl(file.secure_url)
    } catch (e) {
      setIsProfileImageUploading(false)
    }
  }

  return (
    <div className="flex">
      {profileImageUrl && (
        <button
          className={`inline-block relative mb-2 mx-auto hover:opacity-75 ${
            isProfileImageUploading ? 'opacity-75' : ''
          } focus:outline-none focus:shadow-outline`}
          onClick={openProfilePictureUploader}
          onMouseOver={() => setProfilePictureHovered(true)}
          onFocus={() => () => setProfilePictureHovered(true)}
          onMouseOut={() => setProfilePictureHovered(false)}
          onBlur={() => setProfilePictureHovered(false)}
        >
          <img alt={`${firstName} ${lastName}`} src={profileImageUrl} />
          <FontAwesomeIcon
            size="lg"
            className={`${
              profilePictureHovered && !isProfileImageUploading ? '' : 'hidden'
            } absolute top-0 right-0 transform translate-y-1 -translate-x-1 opacity-75`}
            icon={faCamera}
          />
          <ClipLoader
            loading={isProfileImageUploading}
            css={cliLoaderCss}
            size={35}
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
        disabled={isProfileImageUploading}
        ref={fileUploaderRef}
        id="profile-picture-uploader"
        className="hidden"
        type="file"
        onChange={uploadProfilePicture}
      />
    </div>
  )
}

export default ProfileImage
