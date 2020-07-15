import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { Layout } from '@components'
import {
  useAuth,
  useGetCurrentUserPosts,
  useUpdateCurrentUserInformationMutation,
  CurrentUserType
} from '@hooks'

const ENTER_KEY = 13

interface AboutSectionProps {
  currentUser?: CurrentUserType
}

const AboutSection = ({ currentUser }: AboutSectionProps) => {
  const { firstName, lastName, profile } = currentUser || {}
  const [isEditBioInputOpen, setIsEditBioInputOpen] = React.useState(false)
  const [bio, setBio] = React.useState(profile?.bio)
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
    <section className="bg-white flex flex-col p-6 lg:w-2/6 shadow-2xl lg:mr-3 lg:mb-0 mb-3">
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

      <h2 className="text-xl mb-2 underline text-center lg:text-left">
        {firstName} {lastName}
      </h2>
      {bio && !isEditBioInputOpen && (
        <button
          className="text-center lg:text-left w-full hover:border-dashed focus:outline-none focus:shadow-outline hover:border-2 hover:border-black"
          onClick={() => setIsEditBioInputOpen(true)}
        >
          <p>{bio}</p>
        </button>
      )}
      {isEditBioInputOpen && (
        <div className="flex flex-col">
          <textarea
            maxLength={255}
            rows={4}
            autoFocus
            className="w-full flex-wrap p-2"
            value={bio}
            onBlur={() => setIsEditBioInputOpen(false)}
            onChange={e => {
              setBio(e.target.value)
            }}
            onKeyDown={e => {
              if (e.keyCode !== ENTER_KEY) {
                return
              }

              if (bio) {
                updateCurrentUserInformation({
                  variables: {
                    input: {
                      updatableCurrentUserInformation: {
                        bio
                      }
                    }
                  }
                })
                setIsEditBioInputOpen(false)
              }
            }}
          />
          <span
            className={`self-end text-gray-500 ${
              bio.length >= 200 ? 'text-red-700' : ''
            }`}
          >
            {bio.length} / 255
          </span>
        </div>
      )}
      {!bio && !isEditBioInputOpen && (
        <button
          className="hover:text-gray-500 text-gray-700 lg:text-left"
          onClick={() => setIsEditBioInputOpen(true)}
        >
          Click here to add a bio <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
    </section>
  )
}

const PostSection = () => {
  const { results } = useGetCurrentUserPosts()

  return (
    <section className="bg-white flex flex-col w-full p-6 shadow-2xl">
      <div className="flex justify-between items-center content-center mb-2">
        <h2 className="text-2xl underline">Blogs</h2>
        <div>
          <button className="mr-1 hover:bg-gray-200 py-1 px-2">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="hover:bg-gray-200 py-1 px-2">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {results.map(({ createdAt, title, id }) => (
          <Link key={id} href="/post">
            <a className="flex flex-col bg-white border focus:outline-none focus:shadow-outline shadow-lg p-4 w-full lg:w-posts m-2 hover:bg-gray-100">
              {title && <h3 className="text-xl">{title}</h3>}
              {!title && (
                <h3 className="text-xl italic text-gray-700">No Title</h3>
              )}
              <div className="text-sm italic text-gray-700">
                Created on: {format(new Date(createdAt), 'yyyy-MM-dd')}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

const Me = () => {
  const { currentUser, isAuthorized, isQueryLoading } = useAuth()

  React.useEffect(() => {
    if (!isQueryLoading && !isAuthorized) {
      Router.push('/login')
    }
  }, [isQueryLoading, isAuthorized])

  if (isQueryLoading || !isAuthorized || !currentUser) {
    return null
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:content-start mx-auto lg:w-9/12">
        <AboutSection currentUser={currentUser} />
        <PostSection />
      </div>
    </Layout>
  )
}

export default Me
