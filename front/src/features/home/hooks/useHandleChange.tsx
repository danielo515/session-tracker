import { ChangeEventHandler, useEffect, useState } from 'react';

function useHandleChange(initialValue: string) {
  const [value, setter] = useState(initialValue);
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => setter(event.target.value);
  useEffect(() => {
    setter(initialValue);
  }, [initialValue]);
  return [value, handleChange] as const;
}

export default useHandleChange;
