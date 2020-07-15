import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { useGetCurrentUserPosts } from '@hooks'

const CurrentUserPosts = () => {
  const { results } = useGetCurrentUserPosts()

  return (
    <>
      <div className="flex justify-between items-center content-center mb-2">
        <h2 className="text-2xl underline">Blogs</h2>
        <div>
          <button className="mr-1 hover:bg-gray-200 py-1 px-2">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="hover:bg-gray-200 py-1 px-2">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
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
    </>
  )
}

export default CurrentUserPosts