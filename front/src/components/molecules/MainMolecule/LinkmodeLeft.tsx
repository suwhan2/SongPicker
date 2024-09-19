import React from 'react'
import LinkmodeMaintext from '../../atoms/MainAtom/LinkmodeMaintext'
import LinkModeSubtext from '../../atoms/MainAtom/LinkModeSubtext'

type Props = {}

const LinkmodeLeft = (props: Props) => {
  return (
    <div>
      <LinkmodeMaintext />
      <LinkModeSubtext />
    </div>
  )
}

export default LinkmodeLeft