import React from 'react';
import MemeberSelectTitle from '../../atoms/MainAtom/MemeberSelectTitle';
import MemberSelectDescription from '../../atoms/MainAtom/MemberSelectDescription';

interface MemberSelectItemProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const MemberSelectItem = ({ title, description, selected, onClick }: MemberSelectItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-full h-[28%] min-h-36 rounded-lg cursor-pointer
      ${selected ? 'p-[3px]' : 'p-0'}`}
      style={{
        background: selected ? 'linear-gradient(to right, #9747FF, #FF24BD)' : 'transparent',
      }}
    >
      <div
        className={`w-full h-full rounded-lg p-4 flex flex-col
        ${selected ? 'bg-black' : 'border-2 border-[#cccccc]'}`}
      >
        <MemeberSelectTitle text={title} className={selected ? 'text-[#D34ADE]' : 'text-white'} />
        <MemberSelectDescription text={description} />
      </div>
    </div>
  );
};

export default MemberSelectItem;
