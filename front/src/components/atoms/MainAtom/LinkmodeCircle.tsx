import React from 'react'

type Props = {}

const LinkmodeCircle = (props: Props) => {
  return (
    <div className='cursor-pointer font-semibold text-center size-24 rounded-full border-2 flex flex-col items-center justify-center'>
      <p>QR코드로</p>
      <p>연결하기</p>
    </div>
  )
}

export default LinkmodeCircle