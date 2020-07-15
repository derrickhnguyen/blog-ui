import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppProps } from 'next/app'
import { withApollo } from '@lib'
import { AuthProvider } from '@providers'
import '../styles/global.css'

const App = ({
  apollo,
  Component,
  pageProps
}: AppProps & { apollo: ApolloClient<any> }) => (
  <ApolloProvider client={apollo}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ApolloProvider>
)

export default withApollo(App)
