import React, { useEffect } from 'react';
import MemberSelectItem from '../../organisms/MainOrganism/MemberSelectItem';

interface MemberSelectListProps {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

const MemberSelectList = ({ selectedMode, setSelectedMode }: MemberSelectListProps) => {
  useEffect(() => {
    if (selectedMode === '') {
      setSelectedMode('솔로 모드');
    }
  }, []);

  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col justify-between px-5 py-6 ">
      <MemberSelectItem
        title="솔로 모드"
        description="오늘은 혼자 노래를 즐길거에요~"
        selected={selectedMode === '솔로 모드'}
        onClick={() => setSelectedMode('솔로 모드')}
      />
      <MemberSelectItem
        title="믹스 모드"
        description="다양한 모드를 믹스해서 즐기세요!"
        selected={selectedMode === '믹스 모드'}
        onClick={() => setSelectedMode('믹스 모드')}
      />
      <MemberSelectItem
        title="그룹 모드"
        description="그룹으로 노래를 즐겨보세요!"
        selected={selectedMode === '그룹 모드'}
        onClick={() => setSelectedMode('그룹 모드')}
      />
    </div>
  );
};

export default MemberSelectList;
