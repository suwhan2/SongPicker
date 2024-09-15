import React from 'react'
import NavLogoIcon from '../../atoms/commons/NavLogoIcon'
import TopNavbarLeftList from '../../molecules/commons/TopNavbarLeftList'
import TopNavbarRightList from '../../molecules/commons/TopNavbarRightList'

type Props = {}

const TopNavbar = (props: Props) => {
  return (
    <nav className="sticky w-screen max-w-[640px] mx-auto top-0 left-0 h-[60px] bg-[#222] flex items-center px-4 py-2 justify-between">
      <TopNavbarLeftList />
      <TopNavbarRightList />
    </nav>
  )
}

export default TopNavbar