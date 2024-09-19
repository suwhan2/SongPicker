import React from 'react'
import TopNavbar from '../components/organisms/commons/TopNavbar'
import BottomNavbar from '../components/organisms/commons/BottomNavbar'

type Props = {}

const GroupPage = (props: Props) => {
  return (
    <div>
      {/* 상단네브 */}
      <TopNavbar />

      {/* 그룹페이지 내용 담기는 곳 */}
      <div>
        GroupPage
      </div>

      {/* 하단 네브 */}
      <BottomNavbar />
    </div>
  )
}

export default GroupPage