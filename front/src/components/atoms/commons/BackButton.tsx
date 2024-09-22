import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="text-white">
      <IoChevronBack size={24} />
    </button>
  );
};

export default BackButton;
