import React from 'react'

interface ContentContainerProps {
  children: React.ReactNode
}

const ContentContainer = ({ children }: ContentContainerProps) => (
  <div className="flex min-h-content bg-teal-700 p-5">{children}</div>
)

export default ContentContainer
