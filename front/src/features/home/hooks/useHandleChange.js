import { useEffect, useState } from 'react';

/**
 * @param {string} initialValue
 */
function useHandleChange(initialValue) {
  const [value, setter] = useState(initialValue);
  /** @type {import('react').ChangeEventHandler<HTMLInputElement>}  */
  const handleChange = event => setter(event.target.value);
  useEffect(() => {
    setter(initialValue);
  }, [initialValue]);
  return [value, handleChange];
}

export default useHandleChange;
