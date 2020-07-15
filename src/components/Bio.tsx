import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  CurrentUserType,
  useUpdateCurrentUserInformationMutation
} from '@hooks'

interface BioProps {
  currentUser: CurrentUserType
}

const ENTER_KEY = 13

const Bio = ({ currentUser }: BioProps) => {
  const { firstName, lastName, profile } = currentUser || {}
  const [isEditBioInputOpen, setIsEditBioInputOpen] = React.useState(false)
  const [bio, setBio] = React.useState(profile?.bio)

  const [
    updateCurrentUserInformation
  ] = useUpdateCurrentUserInformationMutation()

  return (
    <>
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
    </>
  )
}

export default Bio
