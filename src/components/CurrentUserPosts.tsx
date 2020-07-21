import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { useGetCurrentUserPosts } from '@hooks'

const LIMIT = 18

const CurrentUserPosts = () => {
  const [before, setBefore] = React.useState<string>()
  const [after, setAfter] = React.useState<string>()
  const { results, paginationCursors } = useGetCurrentUserPosts({
    limit: LIMIT,
    after,
    before
  })
  const { startCursor, endCursor } = paginationCursors || {}

  return (
    <>
      <div className="flex justify-between content-center items-center">
        <h2 className="text-2xl underline mb-2">Blogs</h2>
        {results.length > 0 && (
          <div className="flex">
            <button
              disabled={!startCursor}
              className="pt-1 px-2 focus:outline-none focus:shadow-outline hover:bg-gray-200 disabled:opacity-50"
              onClick={() => {
                setBefore(startCursor)
                setAfter(endCursor)
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              disabled={!endCursor}
              className="pt-1 px-2 focus:outline-none focus:shadow-outline hover:bg-gray-200 disabled:opacity-50"
              onClick={() => {
                setBefore(undefined)
                setAfter(endCursor)
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
      {results.length === 0 && (
        <div className="flex justify-center content-center items-center h-full text-gray-600 text-md lg:text-xl">
          Uh oh! You don't have any blogs. Click "Create" to start a new blog.
        </div>
      )}
      {results.length > 0 && (
        <div className="flex flex-wrap">
          {results.map(({ createdAt, title, id }) => (
            <Link key={id} href={`/posts/${id}`}>
              <a
                href="/post"
                className="flex flex-col bg-white border focus:outline-none focus:shadow-outline shadow-lg p-4 w-full lg:w-posts m-2 hover:bg-gray-100"
              >
                {title && <h3 className="text-xl">{title}</h3>}
                {!title && (
                  <h3 className="text-xl italic text-gray-700">No Title</h3>
                )}
                <div className="text-sm italic text-gray-700">
                  Created on {format(new Date(createdAt), 'yyyy/MMM/dd')}
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default CurrentUserPosts
