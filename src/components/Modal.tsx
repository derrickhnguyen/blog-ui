import React from 'react'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'

ReactModal.setAppElement('#__next')

interface ModalProps {
  children: React.ReactNode
  contentLabel: string
  isOpen?: boolean
  onClose: () => void
}

const Modal = ({
  children,
  contentLabel,
  isOpen = true,
  onClose
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="flex justify-center items-center content-center p-2 h-1/2 w-3/4 lg:m-0 lg:h-modal lg:w-modal shadow bg-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
      contentLabel={contentLabel}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      <button className="hover:opacity-75" onClick={onClose}>
        <FontAwesomeIcon
          size="lg"
          className="absolute top-0 right-0 transform translate-y-1 -translate-x-1  opacity-50"
          icon={faWindowClose}
        />
      </button>
      {children}
    </ReactModal>
  )
}

export default Modal
