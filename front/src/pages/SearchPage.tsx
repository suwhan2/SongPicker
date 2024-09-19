import React from 'react'
import TopNavbar from '../components/organisms/commons/TopNavbar'
import BottomNavbar from '../components/organisms/commons/BottomNavbar'

type Props = {}

const SearchPage = (props: Props) => {
  return (
    <div>
      <TopNavbar />

      {/* 검색페이지 내용 */}
      <div>
        SearchPage
      </div>


      {/* 하단 네브 */}
      <BottomNavbar />
    </div>
  )
}

export default SearchPage