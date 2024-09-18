import React, { useState, useRef } from 'react';
import SignupProfileButton from '../../atoms/signup/SignupProfileButton';
import { FaUser } from 'react-icons/fa';

type UserInfoImgSignupFormProps = {
  onChange?: (file: File | null) => void;
};

const UserInfoImgSignupForm = ({ onChange }: UserInfoImgSignupFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    } else {
      setPreviewUrl(null);
      onChange?.(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="text-lg text-white">(선택) 프로필 사진</label>
      <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
        ) : (
          <FaUser className="text-white text-3xl" />
        )}
      </div>
      <SignupProfileButton onClick={handleImageSelect} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default UserInfoImgSignupForm;