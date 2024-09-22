import React from 'react';

type LoginInputProps = {
  id: string;
  type: 'text' | 'password';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginInput = ({ id, type, placeholder, value, onChange }: LoginInputProps) => {
  return (
    <div className="form-control w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input w-full bg-transparent text-input-text placeholder-input-text border-0 border-b border-input-text focus:outline-none focus:border-primary rounded-none px-0 py-2"
      />
    </div>
  );
};

export default LoginInput;
