import isomorphicFetch from 'isomorphic-fetch'

const fetch = (url, options?: Record<string, any>) =>
  isomorphicFetch(url, { credentials: 'include', ...options })

export default fetch
