import React from 'react'
import TopNavbar from '../components/organisms/commons/TopNavbar'
import BottomNavbar from '../components/organisms/commons/BottomNavbar'

type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div>
      {/* 싱단 네브 */}
      <TopNavbar />

      {/* 마이페이지 내용 */}
      <div>
        ProfilePage
      </div>


      {/* 하단 네브 */}
      <BottomNavbar />

    </div>


  )
}

export default ProfilePage