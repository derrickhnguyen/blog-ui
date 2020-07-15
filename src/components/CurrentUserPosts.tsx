import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useGetCurrentUserPosts } from '@hooks'

const LIMIT = 12

const CurrentUserPosts = () => {
  const [limit, setLimit] = React.useState<number>(LIMIT)
  const { results, totalResults } = useGetCurrentUserPosts({ limit })

  return (
    <>
      <h2 className="text-2xl underline mb-2">Blogs</h2>
      <div className="flex flex-wrap">
        {results.map(({ createdAt, title, id }) => (
          <Link key={id} href="/post">
            <a
              href="/post"
              className="flex flex-col bg-white border focus:outline-none focus:shadow-outline shadow-lg p-4 w-full lg:w-posts m-2 hover:bg-gray-100"
            >
              {title && <h3 className="text-xl">{title}</h3>}
              {!title && (
                <h3 className="text-xl italic text-gray-700">No Title</h3>
              )}
              <div className="text-sm italic text-gray-700">
                Created on: {format(new Date(createdAt), 'yyyy-MM-dd')}
              </div>
            </a>
          </Link>
        ))}
      </div>
      {limit <= totalResults && (
        <button
          className="border border-solid border-gray-400 m-2 bg-white hover:bg-gray-200 hover:opacity-75 focus:outline-none focus:shadow-outline"
          onClick={() => setLimit(limit + LIMIT)}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )}
    </>
  )
}

export default CurrentUserPosts
