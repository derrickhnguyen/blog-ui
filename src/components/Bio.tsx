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
    <div className="flex flex-col">
      <h2 className="text-xl text-center lg:text-left">
        {firstName} {lastName}
      </h2>
      <h2 className="font-semibold underline">About</h2>
      {bio && !isEditBioInputOpen && (
        <button
          className="w-full border border-transparent focus:outline-none focus:shadow-outline hover:opacity-50 hover:border hover:border-solid hover:border-gray-800"
          onClick={() => setIsEditBioInputOpen(true)}
        >
          <p className="text-left text-sm">{bio}</p>
        </button>
      )}
      {isEditBioInputOpen && (
        <div className="flex flex-col">
          <textarea
            maxLength={255}
            rows={4}
            autoFocus
            className="w-full flex-wrap p-2 text-sm"
            value={bio}
            onBlur={() => setIsEditBioInputOpen(false)}
            onChange={e => {
              setBio(e.target.value)
            }}
            onKeyDown={e => {
              if (e.keyCode !== ENTER_KEY) {
                return
              }

              updateCurrentUserInformation({
                variables: {
                  input: {
                    updatableCurrentUserInformation: {
                      bio: bio.trim()
                    }
                  }
                }
              })
              setIsEditBioInputOpen(false)
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
          className="hover:text-gray-500 text-gray-700 text-left text-xs"
          onClick={() => setIsEditBioInputOpen(true)}
        >
          Click here to add a bio <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
    </div>
  )
}

export default Bio
