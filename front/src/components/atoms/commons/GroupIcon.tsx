import { MdGroup } from 'react-icons/md';

interface GroupIconProps {
  isActive: boolean;
}

const GroupIcon: React.FC<GroupIconProps> = ({ isActive }) => {
  const activeColor = "#9747FF";
  const inactiveColor = "white";

  return (
    <div className='flex flex-col items-center'>
      <MdGroup 
        className={`h-[26px] w-auto mb-1`}
        color={isActive ? activeColor : inactiveColor}
      />
      <p className={`text-[10px] ${isActive ? 'text-[#9747FF]' : 'text-white'}`}>
        그룹
      </p>
    </div>
  );
}

export default GroupIcon;