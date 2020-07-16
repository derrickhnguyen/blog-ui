import React from 'react'

interface ContentContainerProps {
  children: React.ReactNode
}

const ContentContainer = ({ children }: ContentContainerProps) => (
  <div className="flex min-h-content bg-teal-700 p-3 lg:p-2 lg:max-h-content">
    {children}
  </div>
)

export default ContentContainer
