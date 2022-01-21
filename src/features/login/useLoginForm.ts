import { SyntheticEvent, useState } from 'react';

const handleEvent =
  <T>(set: (arg: T) => void) =>
  ({ currentTarget }: SyntheticEvent<{ value: T }>) =>
    set(currentTarget.value);

const useSignUp = () => {
  const [verificationPassword, setVerificationPassword] = useState('');
  const [name, setName] = useState('');
  return {
    verificationPassword,
    setVerificationPassword: handleEvent(setVerificationPassword),
    name,
    setName: handleEvent(setName),
  };
};

export const useLoginForm = ({ isSignUp = false } = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return {
    email,
    setEmail: handleEvent(setEmail),
    password,
    setPassword: handleEvent(setPassword),
    ...(isSignUp && useSignUp()),
  };
};
