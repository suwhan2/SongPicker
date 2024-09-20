import React, { useState, useEffect, useCallback } from 'react';
import BasicInfoIdForm from '../../molecules/signup/BasicInfoIdSignupForm';
import BasicInfoPasswordForm from '../../molecules/signup/BasicInfoPasswordSignupForm';
import BasicInfoPasswordConfirmForm from '../../molecules/signup/BasicInfoPasswordConfirmSignupForm';

type BasicInfoFormProps = {
  onValidation: (isValid: boolean) => void;
  onSubmit: (formData: { loginId: string; password: string }) => void;
  onInputChange: () => void;
};

const SignupBasicInfoForm = React.memo(
  ({ onValidation, onSubmit, onInputChange }: BasicInfoFormProps) => {
    const [formData, setFormData] = useState({
      loginId: '',
      password: '',
      passwordConfirm: '',
    });
    const [validations, setValidations] = useState({
      loginId: { isValid: false, isAvailable: false },
      password: false,
      passwordConfirm: false,
    });
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        onInputChange();
      },
      [onInputChange]
    );

    const handleIdValidation = useCallback((isValid: boolean, isAvailable: boolean) => {
      setValidations(prev => ({ ...prev, loginId: { isValid, isAvailable } }));
    }, []);

    const handlePasswordValidation = useCallback((isValid: boolean) => {
      setValidations(prev => ({ ...prev, password: isValid }));
      setShowPasswordConfirm(isValid);
    }, []);

    const handlePasswordConfirmValidation = useCallback((isValid: boolean) => {
      setValidations(prev => ({ ...prev, passwordConfirm: isValid }));
    }, []);

    useEffect(() => {
      const isFormValid =
        validations.loginId.isValid &&
        validations.loginId.isAvailable &&
        validations.password &&
        (!showPasswordConfirm || validations.passwordConfirm);

      onValidation(isFormValid);

      if (isFormValid) {
        onSubmit({ loginId: formData.loginId, password: formData.password });
      }
    }, [formData, validations, showPasswordConfirm, onValidation, onSubmit]);

    return (
      <div className="flex flex-col space-y-12 min-w-72  w-full">
        <BasicInfoIdForm
          loginId={formData.loginId}
          onChange={handleChange}
          onValidation={handleIdValidation}
        />
        <BasicInfoPasswordForm
          password={formData.password}
          onChange={handleChange}
          onValidation={handlePasswordValidation}
        />
        {showPasswordConfirm && (
          <BasicInfoPasswordConfirmForm
            password={formData.password}
            passwordConfirm={formData.passwordConfirm}
            onChange={handleChange}
            onValidation={handlePasswordConfirmValidation}
          />
        )}
      </div>
    );
  }
);

export default SignupBasicInfoForm;
