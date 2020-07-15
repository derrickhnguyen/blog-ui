import React from 'react'
import css from 'classnames'

type ButtonType = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: ButtonType
}

const Button = ({
  children,
  disabled = false,
  onClick = () => undefined,
  type = 'primary'
}: ButtonProps) => (
  <button
    disabled
    onClick={onClick}
    className={css(
      'rounded border-solid border focus:outline-none focus:shadow-outline focus:border-gray-300 text-white py-1 px-4 shadow uppercase',
      {
        'bg-teal-700': type === 'primary',
        'bg-orange-700': type === 'secondary',
        'bg-purple-700': type === 'tertiary',
        'opacity-75 cursor-not-allowed': disabled
      },
      [
        type === 'primary' && !disabled && 'hover:bg-teal-800',
        type === 'secondary' && !disabled && 'hover:bg-orange-800',
        type === 'tertiary' &&
          !disabled &&
          'hover:bg-teal-800 hover:bg-purple-800'
      ]
    )}
  >
    {children}
  </button>
)

export default Button
