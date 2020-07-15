import React from 'react'
import Navigation from './Navigation'
import ContentContainer from './ContentContainer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col">
    <Navigation />
    <ContentContainer>{children}</ContentContainer>
  </div>
)

export default Layout
