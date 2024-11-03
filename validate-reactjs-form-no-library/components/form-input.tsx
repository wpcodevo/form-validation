import React, { useState } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name, label, error, className, ...props }, ref) => {
    const [focused, setFocus] = useState(false);
    const handleFocus = () => {
      setFocus(true);
    };
    return (
      <div className={`form-input ${className}`}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          type={type}
          name={name}
          className={`input ${error ? 'input-error' : ''} ${
            focused ? 'input-focused' : ''
          }`}
          onFocus={() => name === 'confirmPassword' && setFocus(true)}
          onBlur={handleFocus}
          {...props}
        />
        {error && <span className='error-message'>{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export { FormInput };
