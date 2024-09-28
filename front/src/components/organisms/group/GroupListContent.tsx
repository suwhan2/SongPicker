import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical, BsX } from 'react-icons/bs';

interface Group {
  teamId: string;
  teamImage: string;
  teamName: string;
  teamMemberCount: number;
}

interface GroupListContentProps {
  groups: Group[];
}

const GroupListContent = ({ groups }: GroupListContentProps) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleGroupClick = (teamId: string) => {
    navigate(`/group/${teamId}`);
  };

  const toggleMenu = (e: React.MouseEvent, teamId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === teamId ? null : teamId);
  };

  const closeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-black">
      <div className="grid grid-cols-2 gap-4 p-4">
        {groups.map(group => (
          <div
            key={group.teamId}
            className="bg-gray-800 rounded-lg p-4 m-2 cursor-pointer relative aspect-square flex flex-col justify-between"
            onClick={() => handleGroupClick(group.teamId)}
          >
            <div className="absolute top-2 right-2" ref={menuRef}>
              <button
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                onClick={e => toggleMenu(e, group.teamId)}
              >
                <BsThreeDotsVertical className="text-gray-400" />
              </button>
              {openMenuId === group.teamId && (
                <div className="absolute right-0 mt-1 w-40 bg-gray-700 bg-opacity-90 rounded-md shadow-lg overflow-hidden z-10 transition-all duration-300 ease-in-out origin-top-right scale-100 opacity-100">
                  <div className="relative">
                    <button
                      onClick={closeMenu}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                      <BsX size={20} />
                    </button>
                  </div>
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-600">
                      멤버 추가
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-600">
                      그룹 편집
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-600">
                      그룹 나가기
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex justify-center">
                <img
                  src={group.teamImage}
                  alt={group.teamName}
                  className="w-2/3 object-cover mb-4"
                />
              </div>
              <h2 className="text-lg font-semibold text-white">{group.teamName}</h2>
              <p className="text-sm text-gray-400">{group.teamMemberCount} / 6</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupListContent;
