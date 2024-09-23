import React from 'react';

type SignupInputProps = {
  id: string;
  name: string;
  type: 'text' | 'password' | 'tel' | 'number';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
};

const SignupInput = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  maxLength,
}: SignupInputProps) => {
  return (
    <div className="form-control w-full">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input w-full bg-transparent text-input-text placeholder-input-text border-0 border-b border-input-text focus:outline-none focus:border-primary rounded-none px-0 py-2 ${className}`}
        disabled={disabled}
        maxLength={maxLength}
      />
    </div>
  );
};

export default SignupInput;
