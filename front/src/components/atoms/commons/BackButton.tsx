import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleClick} className="text-white">
      <IoChevronBack size={24} />
    </button>
  );
};

export default BackButton;
