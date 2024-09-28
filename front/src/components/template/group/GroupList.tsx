import React, { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import CreateGroupModal from '../../organisms/group/CreateGroupModal';
import GroupListContent from '../../organisms/group/GroupListContent';

// Mock data for groups
const mockGroups = Array(16)
  .fill(null)
  .map((_, index) => ({
    teamId: `team${index + 1}`,
    teamImage: '/src/assets/songPickerLogo.svg',
    teamName: '최대여덟글자하자',
    teamMemberCount: Math.floor(Math.random() * 6) + 5,
  }));

const GroupList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fixedContent = (
    <div className="flex p-4 bg-black justify-end">
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-1/3 bg-primary text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        새 그룹 만들기
      </button>
    </div>
  );

  return (
    <MainLayout title="그룹" fixedContent={fixedContent}>
      <div className="pb-16">
        <GroupListContent groups={mockGroups} />
      </div>
      <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MainLayout>
  );
};

export default GroupList;
