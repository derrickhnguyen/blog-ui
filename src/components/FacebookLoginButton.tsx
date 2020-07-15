import React from 'react'
import FacebookLogin from 'react-facebook-login'

const APP_ID = '901298377050453'
const VERSION = '7.0'

export type FacebookResponseType = {
  accessToken: string
}

interface FacebookLoginButtonProps {
  onFacebookResponse: (response: FacebookResponseType) => any
}

const FacebookLoginButton = ({
  onFacebookResponse
}: FacebookLoginButtonProps) => (
  <FacebookLogin
    appId={APP_ID}
    version={VERSION}
    fields="name,email"
    callback={onFacebookResponse}
  />
)

export default FacebookLoginButton
