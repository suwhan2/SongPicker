import React, { useState } from 'react';
import BottomSlideModal from '../../template/commons/BottomSlideModal';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGroupImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // 여기에 그룹 생성 로직을 추가합니다.
    console.log('그룹 생성:', { groupName, groupImage });
    onClose();
  };

  return (
    <BottomSlideModal isOpen={isOpen} onClose={onClose} title="새 그룹 만들기" height="50vh">
      <div className="p-4 flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="groupImage" className="block text-white mb-2">
            그룹 이미지
          </label>
          <div className="w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center cursor-pointer">
            {groupImage ? (
              <img
                src={URL.createObjectURL(groupImage)}
                alt="Group"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-4xl text-gray-400">+</span>
            )}
            <input
              type="file"
              id="groupImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-white mb-2">
            그룹 이름
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
            placeholder="그룹 이름을 입력해주세요"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          그룹 생성
        </button>
      </div>
    </BottomSlideModal>
  );
};

export default CreateGroupModal;
