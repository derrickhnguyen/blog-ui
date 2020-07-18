import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faTwitter,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'
import {
  CurrentUserType,
  useUpdateCurrentUserSocialMediasMutation
} from '@hooks'
import { Modal } from '@components'
import Button from './Button'

interface EditSocialMediasModalProps {
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  onSave: (args: {
    facebookUrl: string
    instagramUrl: string
    twitterUrl: string
  }) => void
  isOpen: boolean
  onClose: () => void
}

interface SocialMediaProps {
  currentUser: CurrentUserType
}

const EditSocialMediasModal = ({
  onSave,
  onClose,
  isOpen,
  ...restProps
}: EditSocialMediasModalProps) => {
  const [facebookUrl, setFacebookUrl] = React.useState(restProps.facebookUrl)
  const [instagramUrl, setInstagramUrl] = React.useState(restProps.instagramUrl)
  const [twitterUrl, setTwitterUrl] = React.useState(restProps.twitterUrl)

  return (
    <Modal isOpen={isOpen} contentLabel="Edit social medias" onClose={onClose}>
      <>
        <div className="flex flex-col justify-center items-center content-center p-2 text-xl font-bold underline">
          <h1>Update social media links</h1>
        </div>
        <div className="flex flex-col m-3">
          <div className="mb-2">
            <h3 className="text-lg font-bold">Facebook</h3>
            <input
              className="border border-gray-800 w-3/4 p-1"
              value={facebookUrl}
              onChange={e => setFacebookUrl(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Instagram</h3>
            <input
              className="border border-gray-800 w-3/4 p-1"
              value={instagramUrl}
              onChange={e => setInstagramUrl(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Twitter</h3>
            <input
              className="border border-gray-800 w-3/4 p-1"
              value={twitterUrl}
              onChange={e => setTwitterUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full m-3">
          <Button
            type="secondary"
            className="mr-2"
            onClick={() => onSave({ facebookUrl, instagramUrl, twitterUrl })}
          >
            Save
          </Button>
          <Button type="neutral" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  )
}

const SocialMedia = ({ currentUser }: SocialMediaProps) => {
  const [
    isEditSocialMediasModalOpen,
    setIsEditSocialMediasModalOpen
  ] = React.useState(false)
  const [facebookUrl, setFacebookUrl] = React.useState(
    currentUser.profile.facebookUrl
  )
  const [twitterUrl, setTwitterUrl] = React.useState(
    currentUser.profile.twitterUrl
  )
  const [instagramUrl, setInstagramUrl] = React.useState(
    currentUser.profile.instagramUrl
  )

  const [
    updateCurrentUserSocialMedias
  ] = useUpdateCurrentUserSocialMediasMutation()

  return (
    <>
      <div className="flex flex-col content-center items-center justify-center mb-2">
        {(facebookUrl || twitterUrl || instagramUrl) && (
          <div className="flex">
            {facebookUrl && (
              <a
                target="_blank"
                href={facebookUrl}
                tabIndex={0}
                className="hover:opacity-75 mr-1 p-1 hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            )}
            {instagramUrl && (
              <a
                target="_blank"
                href={instagramUrl}
                tabIndex={0}
                className="hover:opacity-75 mr-1 p-1 hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
            {twitterUrl && (
              <a
                target="_blank"
                href={twitterUrl}
                tabIndex={0}
                className="hover:opacity-75 mr-1 p-1 hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
          </div>
        )}
        <button
          className="hover:text-gray-500 text-gray-700 text-left text-xs"
          onClick={() => setIsEditSocialMediasModalOpen(true)}
        >
          Add/update social media links <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <EditSocialMediasModal
        facebookUrl={facebookUrl}
        instagramUrl={instagramUrl}
        twitterUrl={twitterUrl}
        isOpen={isEditSocialMediasModalOpen}
        onClose={() => setIsEditSocialMediasModalOpen(false)}
        onSave={async ({ facebookUrl, twitterUrl, instagramUrl }) => {
          await updateCurrentUserSocialMedias({
            variables: { input: { facebookUrl, twitterUrl, instagramUrl } }
          })

          setFacebookUrl(facebookUrl)
          setTwitterUrl(twitterUrl)
          setInstagramUrl(instagramUrl)
          setIsEditSocialMediasModalOpen(false)
        }}
      />
    </>
  )
}

export default SocialMedia
