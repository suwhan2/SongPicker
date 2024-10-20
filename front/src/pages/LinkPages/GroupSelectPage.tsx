import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterButtonLayout from '../../layouts/FooterButtonLayout';
import GroupListContent from '../../components/organisms/group/GroupListContent';
import { getGroupList } from '../../services/groupService';

interface Group {
  teamId: number;
  teamImage: string | null;
  teamName: string;
  teamMemberCount: number;
}

const GroupSelectPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const navigate = useNavigate();

  // 그룹 목록을 불러오는 함수
  const fetchGroups = useCallback(async () => {
    try {
      const response = await getGroupList();
      if (response.code === 'TE103') {
        setGroups(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  }, []);

  useEffect(() => {
    fetchGroups(); // 컴포넌트가 마운트될 때 그룹 목록을 불러옵니다.
  }, [fetchGroups]);

  const handleGroupSelect = (event: React.MouseEvent, groupId: number) => {
    event.stopPropagation();
    setSelectedGroupId(groupId);
  };

  const handleNext = () => {
    if (selectedGroupId) {
      navigate('/qr-scan', { state: { groupId: selectedGroupId } });
    }
  };

  return (
    <FooterButtonLayout
      title="노래방 그룹 선택"
      buttonText="QR스캔"
      onButtonClick={handleNext}
      isButtonValid={selectedGroupId !== null}
    >
      <div className="flex-1">
        <GroupListContent
          groups={groups}
          selectedGroupId={selectedGroupId}
          onGroupEdited={updatedGroup => {
            setGroups(prevGroups =>
              prevGroups.map(group => (group.teamId === updatedGroup.teamId ? updatedGroup : group))
            );
          }}
          onGroupLeft={teamId => {
            setGroups(prevGroups => prevGroups.filter(group => group.teamId !== teamId));
            if (selectedGroupId === teamId) {
              setSelectedGroupId(null);
            }
          }}
          onGroupClick={handleGroupSelect}
          showMenu={false}
        />
      </div>
    </FooterButtonLayout>
  );
};

export default GroupSelectPage;
