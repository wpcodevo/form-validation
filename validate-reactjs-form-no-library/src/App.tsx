import './App.css';
import { FormInput } from '../components/form-input';
import React, { useState } from 'react';

type FormValues = {
  username: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
};

type InputFieldData = {
  id: number;
  type: string;
  name: keyof FormValues;
  placeholder: string;
  label: string;
  error: string;
  pattern?: string;
  required: boolean;
};

const inputFieldData: InputFieldData[] = [
  {
    id: 1,
    type: 'text',
    name: 'username',
    placeholder: 'Username',
    label: 'Username',
    error:
      'Username must be at least 3 characters long and can contain letters, numbers, and underscores.',
    pattern: '^[a-zA-Z0-9_]{3,}$',
    required: true,
  },
  {
    id: 2,
    type: 'email',
    name: 'email',
    placeholder: 'Email',
    label: 'Email',
    error: 'Please enter a valid email address.',
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    required: true,
  },
  {
    id: 3,
    type: 'date',
    name: 'dateOfBirth',
    placeholder: 'Date Of Birth',
    label: 'Date Of Birth',
    error: 'Please enter a valid date.',
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    required: true,
  },
  {
    id: 4,
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    label: 'Password',
    error:
      'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d\\W])[A-Za-z\\d\\W]{8,}$',
    required: true,
  },
  {
    id: 5,
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    label: 'Confirm Password',
    error: 'Passwords must match.',
    required: true,
  },
];

function App() {
  const [values, setValues] = useState<FormValues>({
    username: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted:', values);
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        {inputFieldData.map(({ id, name, ...props }) => {
          const dynamicPattern =
            name === 'confirmPassword' ? `^${values.password}$` : props.pattern;
          return (
            <FormInput
              key={id}
              name={name}
              value={values[name]}
              onChange={handleChange}
              pattern={dynamicPattern}
              {...props}
            />
          );
        })}
        <button type='submit'>Register Account</button>
      </form>
    </div>
  );
}

export default App;
