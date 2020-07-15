import withApollo, { InitApolloOptions } from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { endpoint, prodEndpoint } from '../config'

const createClient = ({ headers }: InitApolloOptions<any>) =>
  new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: { credentials: 'include' },
        headers
      })
    }
  })

export default withApollo(createClient)
