import React from 'react'
import NavLogoIcon from '../../atoms/commons/NavLogoIcon'
import NavLogoText from '../../atoms/commons/NavLogoText'

type Props = {}

const TopNavbarLeftList = (props: Props) => {
  return (
    <div className='flex items-center'>
      <NavLogoIcon />
      <NavLogoText />
    </div>
  )
}

export default TopNavbarLeftList