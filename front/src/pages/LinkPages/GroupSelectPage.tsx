import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterButtonLayout from '../../layouts/FooterButtonLayout';

interface Group {
  id: number;
  name: string;
  imageUrl: string;
  memberCount: number;
}

const GroupSelectPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: API를 통해 그룹 목록을 가져오는 로직 구현
    // 예시 데이터:
    setGroups([
      { id: 1, name: '버니즈 친구들', imageUrl: '/path/to/image1.jpg', memberCount: 3 },
      { id: 2, name: '동창 동호회', imageUrl: '/path/to/image2.jpg', memberCount: 6 },
      { id: 3, name: '삐삐 1학기 친구들', imageUrl: '/path/to/image3.jpg', memberCount: 8 },
      { id: 4, name: '삐삐 공홈 친구들', imageUrl: '/path/to/image4.jpg', memberCount: 8 },
      { id: 5, name: '삐삐 특화 친구들', imageUrl: '/path/to/image5.jpg', memberCount: 8 },
      { id: 6, name: '삐삐 자율 친구들', imageUrl: '/path/to/image6.jpg', memberCount: 5 },
    ]);
  }, []);

  const handleGroupSelect = (groupId: number) => {
    setSelectedGroup(groupId);
  };

  const handleNext = () => {
    if (selectedGroup) {
      navigate('/qr-scan', { state: { groupId: selectedGroup } });
    }
  };

  return (
    <FooterButtonLayout
      title="노래방 그룹 선택"
      buttonText="QR스캔"
      onButtonClick={handleNext}
      isButtonValid={selectedGroup !== null}
    >
      <div className="p-4">
        <button className="w-full bg-purple-600 text-white py-2 rounded-md mb-4">
          새그룹 만들기
        </button>
        <div className="grid grid-cols-2 gap-4">
          {groups.map(group => (
            <div
              key={group.id}
              onClick={() => handleGroupSelect(group.id)}
              className={`relative aspect-square bg-gray-200 rounded-md overflow-hidden ${
                selectedGroup === group.id ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <p className="text-sm font-bold">{group.name}</p>
                <p className="text-xs">({group.memberCount}/8)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FooterButtonLayout>
  );
};

export default GroupSelectPage;
