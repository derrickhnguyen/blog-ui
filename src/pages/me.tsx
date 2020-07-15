import React from 'react'
import Router from 'next/router'
import { format } from 'date-fns'
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
  const [
    updateCurrentUserInformation
  ] = useUpdateCurrentUserInformationMutation()

  return (
    <section className="bg-white flex flex-col p-6 lg:w-2/6 shadow-2xl lg:mr-3 lg:mb-0 mb-3">
      <img
        alt="sample"
        src="https://source.unsplash.com/random/300x300"
        className="mb-5 m-auto"
      />
      <div>
        <h2 className="text-xl mb-2 underline">
          About {firstName} {lastName}
        </h2>
        {bio && !isEditBioInputOpen && (
          <button
            className="text-left w-full hover:border-dashed focus:outline-none focus:shadow-outline hover:border-2 hover:border-black"
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
            className="text-gray-500"
            onClick={() => setIsEditBioInputOpen(true)}
          >
            Click here to add a bio.
          </button>
        )}
      </div>
    </section>
  )
}

const PostSection = () => {
  const { results } = useGetCurrentUserPosts()

  return (
    <div className="bg-white flex flex-col w-full p-6 shadow-2xl">
      <h2 className="text-2xl mb-2 underline">Blogs</h2>
      <div className="flex flex-wrap">
        {results.map(({ createdAt, title, id }) => (
          <button
            key={id}
            className="flex flex-col bg-white border focus:outline-none focus:shadow-outline shadow-lg p-2 w-full lg:w-posts m-2 hover:bg-gray-100"
          >
            {title && <h3 className="text-xl">{title}</h3>}
            {!title && (
              <h3 className="text-xl italic text-gray-700">No Title</h3>
            )}
            <div className="text-sm italic text-gray-700">
              Created on: {format(new Date(createdAt), 'yyyy-MM-dd')}
            </div>
          </button>
        ))}
      </div>
    </div>
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
