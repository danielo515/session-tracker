import { useState } from 'react';

/**
 * @param {string} initialValue
 */
function useHandleChange(initialValue) {
  const [value, setter] = useState(initialValue);
  /** @type {import('react').ChangeEventHandler<HTMLInputElement>}  */
  const handleChange = event => setter(event.target.value);
  return [value, handleChange];
}

export default useHandleChange;
