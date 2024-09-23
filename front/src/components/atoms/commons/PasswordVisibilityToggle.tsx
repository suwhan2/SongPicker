import React from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

interface PasswordVisibilityToggleProps {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordVisibilityToggle = ({ showPassword, onToggle }: PasswordVisibilityToggleProps) => {
  return (
    <button type="button" className="absolute right-2 bottom-3 text-input-text" onClick={onToggle}>
      {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
    </button>
  );
};

export default PasswordVisibilityToggle;
